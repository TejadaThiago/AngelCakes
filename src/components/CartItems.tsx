import { useContext } from "react"
import CartContext, { CartItem } from "../contexts/CartContext"
import { Trash } from "@phosphor-icons/react"



export function CartItems(){
  const {items, addItem, removeItem, deleteItem} = useContext(CartContext)

  function handleRemoveItemFromCart(id:number){
    removeItem(id)
  }

  function handleDeleteItemFromCart(id:number){
    deleteItem(id)
  }

  function handleAddItemToCart(item:CartItem){
    // const newItem: CartItem = {
    //   id: id,
    //   title: title,
    //   description: description,
    //   price: price,
    //   quantity: 1,
    //   image: image
    // }
    addItem(item)
  }

  return(
    <div className=" text-xl flex max-h-[500px] md:max-h-[500px]  bg-gray-200 overflow-y-auto">
        
        {/* <a>{JSON.stringify(items)}</a> */}
      <div className=" " >
      <h1 className="m-2 border-b border-spacing-5 border-gray-300 font-extralight text-xl text-slate-500 ">Itens no carrinho:</h1>

        {/* //items */}
        {items.length > 0 ?
          items.map(item => {
            items.length
            return(
              <div key={item.id} className="border-b border-spacing-5 border-gray-300 flex justify-between bg-rd-300 items-start md:m-8" > 
                
                <div className="flex md:flex-1 bg-bue-300 py-5 ">
                  <img className=' right-0 md:w-20 md:h-20  w-12 h-12 mr-2' src={item.imageName}></img>
                  <div className="flex flex-col gap-3"> 
                    <h2 className="text-gray-700 text-base md:text-md font-mono font-thin text-left">{item.title}</h2>
                      <span className="flex items-center font-thin font-mono gap-2  ">
                          <div className='bg-gray-300 py-1 px-1 md:px-5 rounded-md flex gap-2'> 
                            <button onClick={() => handleRemoveItemFromCart(item.id)} title='Remover do carrinho' className='font-thin font-monotext-violet-900'>-</button>
                            <a className="flex items-center font-thin text-sm text-gray-700 ">{item?.quantity ? item?.quantity : 0}</a>
                            <button onClick={() => handleAddItemToCart(item)} title='Adicionar ao carrinho' className='text-violet-900 '>+</button>
                          </div>
                          <button
                            className="flex  items-center bg-gray-300 text-violet-900 rounded-md p-2" 
                            onClick={() => handleDeleteItemFromCart(item.id)} >
                            <a><Trash /></a> <a className=" text-gray-700 text-sm">remover</a>
                        </button>
                      </span>
                  </div>
                </div>
                  <h2 className="flex min-w-16 text-base md:text-md font-mono pt-5 truncate ">R$: {item.price}</h2>
              </div>
            )
          }
          )
          :
          <div>
            <h1>Nenhum bolinho adicionado ao carrinho :(</h1>
          </div>
        }
      </div>
    <div>
      {/* resume + submit button */}
    </div>
    </div>
  )
}