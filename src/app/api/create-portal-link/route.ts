import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../types_db";
import { cookies } from 'next/headers';
import { createOrRetrieveACustomer } from "../../../../libs/supabaseAdmin";
import { NextResponse } from "next/server";
import { stripe } from "../../../../libs/stripe";
import { getURL } from "next/dist/shared/lib/utils";

export async function POST(req:Request){
    try {
        const supabase = createRouteHandlerClient<Database>({cookies});
        const {data: { user }} = await supabase.auth.getUser();
        if (!user) throw Error('Could not get user');
        const customer = await createOrRetrieveACustomer({uuid: user.id || '',email: user.email || ''});
        if (!customer) throw Error('Could not get customer');
        const { url } = await stripe.billingPortal.sessions.create({customer,return_url: `${getURL()}/account`});
        return new NextResponse(JSON.stringify({ url }), {status: 200});
    } catch (error:any) {
        JSON.stringify({ error: { statusCode: 500, message: error.message } }),{status: 500}
    }

}