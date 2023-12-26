"use client"
import React, { useState } from 'react'
import Modal from './Modal'
import { Price, ProductWithPrice } from '../../types'
import Button from './Button'
import { useUser } from '../../hooks/useUser'
import toast from 'react-hot-toast'
import { postData } from '../../libs/helpers'
import { getStripe } from '../../libs/stripeClient'

const SubscribeModal = ({products}:{products:ProductWithPrice[]}) => {
    const formatPrice = (price:Price) => {
        const priceString = new Intl.NumberFormat('en-US',{
            style:'currency',
            currency:price.currency,
            minimumFractionDigits:0
        }).format((price?.unit_amount||0)/100)
        return priceString
    }
    const {user,isLoading,subscription} = useUser()
    const [priceIdLoading,setPriceIdLoading] = useState<string>()
    const handleCheckout = async (price:Price) => {
        setPriceIdLoading(price.id)
        if(!user){
            setPriceIdLoading(undefined)
            return toast.error('Must be logged in!')
        }
        if(subscription){
            setPriceIdLoading(undefined)
            return toast('Already subscribed')
        }
        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });
            const stripe = await getStripe()
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            toast.error((error as Error)?.message)
        }finally{
            setPriceIdLoading(undefined)
        }
    }
    console.log(products)
    return (
        <Modal title='Only for premium users' description='Listen to music with Spotify Premium' isOpen onChange={()=>{}}>
            {subscription ? (
                <div className='text-center'>
                    Already Subscribed
                </div>
            ) : (products.length === 0 ? (
                <div className='text-center'>
                    No Products Available
                </div>
            ):(
                <div className='flex items-center justify-center'>
                    {products.map((product)=>{
                        if(!product.prices?.length){
                            return(
                                <div key={product.id}>
                                    No Prices Available
                                </div>
                            )
                        }
                        return product.prices.map((price)=>(
                            <Button className='py-2 px-20' disabled={isLoading||price.id === priceIdLoading} key={price.id} onClick={()=>handleCheckout(price)}>
                                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                            </Button>
                        ))
                    })}
                </div>
            ))}
        </Modal>
    )
}

export default SubscribeModal