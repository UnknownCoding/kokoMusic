import { cookies, headers } from 'next/headers';
import { Database } from '../../../../types_db';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createOrRetrieveACustomer } from '../../../../libs/supabaseAdmin';
import { stripe } from '../../../../libs/stripe';
import { getURL } from 'next/dist/shared/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(req:Request){
    const { price, quantity = 1, metadata = {} } = await req.json();
    try {
        const supabase = createRouteHandlerClient<Database>({cookies});
        const {data: { user }} = await supabase.auth.getUser();
        const customer = await createOrRetrieveACustomer({uuid: user?.id || '',email: user?.email || ''});
        // @ts-expect-error
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: 'required',
            line_items: [{price: price.id,quantity}],
            mode: 'subscription',
            allow_promotion_codes: true,
            subscription_data: {
                metadata,
                trial_from_plan: true,
            },
            success_url: `${getURL()}/account`,
            cancel_url: `${getURL()}/`
        });
        return NextResponse.json({ sessionId: session.id });
    } catch (error:any) {
        console.log(error);
        return new Response(JSON.stringify(error), { status: 500 });  
    }
}   