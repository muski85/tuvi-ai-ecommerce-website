import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/sanity/lib/helpers/queries';
import { rateLimiters } from '@/lib/rate-limit';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const identifier = req.ip || req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimitResult = await rateLimiters.chat(identifier);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          reply: `Whoa, slow down! You've sent too many messages. Please wait ${Math.ceil(rateLimitResult.reset / 60)} minute(s) before trying again.`,
          rateLimitExceeded: true,
          resetIn: rateLimitResult.reset
        },
        { status: 429 }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { reply: 'Please provide a valid message.', products: [] },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { reply: 'Your message is too long. Please keep it under 500 characters.', products: [] },
        { status: 400 }
      );
    }

    // Get all products for context
    const products = await getProducts();

    // Enhanced product list with slugs
    const productList = products
      .map((p: any) => 
        `- ${p.name} (slug: ${p.slug?.current}): $${p.price}${p.discount ? ` (${p.discount}% off)` : ''} - ${p.intro || p.description || 'No description'} - Category: ${p.category?.title || 'Uncategorized'}`
      )
      .join('\n');

    const prompt = `You are a helpful shopping assistant for Tuvi, an online fashion store.

Available products in our catalog:
${productList}

Guidelines:
- Be friendly, conversational, and enthusiastic
- When recommending products, mention their names clearly
- If you recommend a product, end your response with: [PRODUCT:slug-here]
- You can recommend multiple products: [PRODUCT:slug-1][PRODUCT:slug-2][PRODUCT:slug-3]
- Mention prices and highlight any discounts
- Keep responses concise (2-4 sentences max)
- Use emojis occasionally to be friendly (1-2 max per response)
- If asked about products not in our catalog, politely suggest similar items we have
- For price-based queries (e.g., "under $50"), recommend products within that range
- For sale/discount queries, prioritize products with discounts

Customer question: ${message}

Provide a helpful, enthusiastic response:`;

    // Generate response
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let reply = response.text();

    // Extract product slugs from AI response
    const productRegex = /\[PRODUCT:([^\]]+)\]/g;
    const matches = [...reply.matchAll(productRegex)];
    const recommendedSlugs = matches.map(m => m[1]);
    
    // Remove product tags from reply
    reply = reply.replace(productRegex, '').trim();

    // Get full product details for recommended products
    const recommendedProducts = products
      .filter((p: any) => recommendedSlugs.includes(p.slug?.current))
      .slice(0, 3) // Max 3 products
      .map((p: any) => ({
        name: p.name,
        price: p.price,
        discount: p.discount,
        slug: p.slug?.current,
        image: p.images?.[0]
      }));

    return NextResponse.json({ 
      reply,
      products: recommendedProducts
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        reply: "I apologize, but I'm having trouble connecting right now. Please try again in a moment! 🙏",
        products: []
      },
      { status: 200 } // Return 200 to show error message to user
    );
  }
}