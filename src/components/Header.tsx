import { Cake, Calendar, Package, WhatsappLogo } from "@phosphor-icons/react";
import logo from '../assets/logo.png'

export function Header(){
  return(
    <div className="flex justify-between mt-20 bg-gradient-to-tl from-gray-50 to-pink-100 p-2 sm:p-4 rounded-xl gap-5">
      <div >
        <h1 className="font-bold text-xl  sm: text-4xls mb-4">
         Um delicoso bolinho de pote para adoçar qualquer momento
        </h1>
        <h4>Na Angel Cakes você encontra os melhores bolinhos de pote, faça ja sua encomenda!</h4>

        <div className="inline-grid gap-1.5 sm:grid-cols-2 mt-6  sm:mt-16 ">
          <span className="flex gap-2 ">
            <a
              className="bg-green-500 h-6 rounded-full p-1 "  >
              <WhatsappLogo />
            </a>
            Peça pelo whatsApp
          </span>
          <span className="flex gap-2">
            <a
              className="bg-teal-300 h-6 rounded-full p-1"  >
              <Calendar />
            </a>
            Entrega agendada
          </span>
          <span className="flex gap-2">
            <a
              className="bg-yellow-600 h-6 rounded-full p-1 ">
              <Package />
            </a>
            Embalagem lacrada
          </span>
          <span className="flex gap-2">
            <a
              className="bg-pink-500 h-6 rounded-full p-1"  >
              <Cake />
            </a>
            Bolinho chega pronto pra comer
          </span>
        </div>
      </div>
      <img className=" hidden sm:block h-52  mr-4" src={logo} alt="img">
      </img>
    </div>
  )
}