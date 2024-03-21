import { HiMiniShoppingCart } from 'react-icons/hi2'
import { CakeProps } from '../pages/Home'
import { useContext } from 'react'
import CartContext, { CartItem } from '../contexts/CartContext'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { CartItems } from './CartItems'
import { NavLink } from 'react-router-dom'

export function ProductCard({ id, title, description ,price, imageName, tags }: CakeProps) {

  const { items, removeItem, addItem} = useContext(CartContext)

  const currentItem = items.find((item) =>  item.id === id)

  function handleRemoveItemToCart(){
    removeItem(id)
  }

  function handleAddItemToCart(){
    const newItem: CartItem = {
      id: id,
      title: title,
      description: description,
      price: price,
      quantity: 1,
      imageName: imageName
    }
    addItem(newItem)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // function sendOrderToWhatsApp(){
  //TODO

  //   clearCart()
  // }

  return(
    <div>
      {/* <a>{JSON.stringify(items)} </a> */}
      <div className="rounded-md rounded-tr-3xl bg-gray-100">
        <div className='pt-10'>
          <img className=' mx-auto right-0 w-32 h-32 'src={imageName} ></img>
          {/* <a>{image}</a> */}
          {/* <a>{image}</a> */}
          <span className="flex gap-2 justify-center">
            {tags?.map(tag => {
              return(
                <a key={tag} className="bg-pink-300 text-pink-700 rounded-full px-3 mt-8 mb-4">
                  {tag} 
                </a>
              )
            })}
            {!tags && <a className="bg-pink-300 text-pink-700 rounded-full py-3 mt-8 mb-4"> {''} </a>}
          </span>
        </div>

        <div className='flex flex-col  items-center w-64 h-64 text-center'>
          <h1 className='text-xl font-bold p-3 mb-2'>{title}</h1>
          <span className='mx-1'>{description}</span>
        </div>
        
        <div className='flex justify-between mx-1 p-4'>
          <span>
            <a className='text-gray-500'>R$: </a>
            <a className='font-medium text-2xl  text-gray-900'>{price}</a>
          </span>
       
          <span className="flex gap-2 justify-center items-center text-xl">
          <a className='bg-gray-200 py-1 px-5 rounded-md flex gap-3'> 
            <button onClick={() => handleRemoveItemToCart()} title='Remover do carrinho' className='text-violet-900'>-</button>
            <>{currentItem?.quantity ? currentItem?.quantity : 0}</>
            <button onClick={() => handleAddItemToCart()} title='Adicionar ao carrinho' className='text-violet-900 '>+</button>
          </a>
            <button
              className=" bg-violet-900 text-white rounded-md p-2"  >

              
              <HoverCard>
                <HoverCardTrigger>
                  <NavLink to='/cart'>
                    <HiMiniShoppingCart title='Ir para o carrinho'/>
                  </NavLink>
                </HoverCardTrigger>
                <HoverCardContent className='bg-slate-100 w-full'>
                  <div className='max-h-[400px] overflow-auto'>
                    <CartItems />
                  </div>
                </HoverCardContent>
              </HoverCard>

            </button>
          </span>
        </div>
      </div>
    </div>
  )
}