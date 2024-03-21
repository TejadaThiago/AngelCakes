import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Input, Button  } from '@nextui-org/react';
import { FaRegUser } from "react-icons/fa";
import { Label } from "@/components/ui/label"
import { CartItems } from "@/components/CartItems";
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { IoLocationSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useContext, useState, ChangeEvent } from "react";
import CartContext from "@/contexts/CartContext";
import { WhatsappLogo } from "@phosphor-icons/react";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useIsMobile } from "@/hooks/useIsMobile";

export function Cart() {
  const isMobile = useIsMobile()
  const { toast } = useToast()

  const {totalAmount, totalItems, items} = useContext(CartContext)

  const defaultDeliveryAddress = {
    cep: '',
    street: '',
    streetNumber:'',
    complement: '',
    city: '',
    district: '',
    stateId: '',
  }

  const [userName, setUserName] = useState<string>('')

  const noNumbers = (value: string) => !/\d/.test(value);

  const deliveryAddressSchema = z.object({
    cep: z.string().min(8, "CEP deve ter 8 digitos").max(8, "CEP deve ter 8 digitos"),
    street: z.string().min(1, "Informe a rua para entrega"),
    streetNumber: z.string().min(1 , "Informe o número da rua (0, casa nao tenha)"),
    complement: z.string(),
    stateId: z.string().max(2, "Deve ter 2 digitos").min(2, "Deve ter 2 digitos").refine(noNumbers, 'Use somente letras'),
    city: z.string().min(1, "Informe a cidade"),
    district: z.string().min(1, "Informe o Baixo")
  })

  type DeliveryAddressSchema = z.infer<typeof deliveryAddressSchema>

  const {register, handleSubmit, formState: { errors, isValid,isDirty}} = useForm<DeliveryAddressSchema>({
    resolver: zodResolver(deliveryAddressSchema)
  })

  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressSchema>(defaultDeliveryAddress)

  function handleAddressConfirmation(data: DeliveryAddressSchema){
    console.log(data)
    setDeliveryAddress(data)
  }

  function handleUserNameChange(e: ChangeEvent<HTMLInputElement>){
    setUserName(e.target.value)
  }

  function submitOrderToWhatsApp(){

    if(userName.length <= 0 ){

      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          variant: 'destructive',
          description: "Informe o seu nome.",
        })
        return
      }

      if(deliveryAddress.cep === ''){
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
            variant: 'destructive',
            description: "Confirme o endereço.",
          })
          return
      }

      if(totalItems() <= 0){
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
            variant: 'destructive',
            description: "Nenhum bolinho selecionado.",
          })
          return
      }
        

    const whatsAppNumber = '5551993605043'
    const whatsAppBody =
      "Gostaria de fazer um pedido 🍰 !\n\n" +
      "Items:\n" +
      items
        .map((item) => `x${item.quantity} ${item.title}`)
        .join("\n") +
      "\n\n" +
      "📍Delivery\n" +
      `${deliveryAddress.city} - ${deliveryAddress.stateId}\n` +
      `${deliveryAddress.street}, ${deliveryAddress.streetNumber} - ${
        deliveryAddress.complement ? deliveryAddress.complement + " - " : ""
      }${deliveryAddress.district}\n\n` +
      `Total de Items: ${totalItems()}\n` +
      `Total do Pedido: R$${totalAmount()}`;

    const msg = window.encodeURIComponent(whatsAppBody)
    window.open("https://api.whatsapp.com/send?phone=" + whatsAppNumber + "&text=" + msg, "_blank")
  }

  if(isMobile){
    return (
      <section>
        <div className="">
          {/* CLIENTE */}
          <div className="flex flex-col justify-normal h-full py-4 bg-slate- mx-4 bg-gray-200 p-4 rounded-xl mt-4">
            <div>
              <div className="flex gap-2 items-center mb-2 ">
                <a className="bg-pink-300 rounded-full p-1">
                  <FaRegUser size={18} />
                </a>
                <h1 className="font-extralight text-xl text-slate-500">
                  Informações do Cliente
                </h1>
                <a>{userName}</a>
              </div>
              <Label htmlFor="userName" className="text-xs">
                Nome
              </Label>
              <Input
                name="usarName"
                placeholder="Digite seu nome..."
                variant="underlined"
                onChange={(e) => handleUserNameChange(e)}
              />
            </div>
          </div>
          {/* ENDERECO */}
          <div className="mx-4 mt-5 p-4 bg-gray-200 rounded-xl">
            <div className=" flex gap-2 items-center mb-3">
              <a className="bg-violet-300 rounded-full p-1">
                <IoLocationSharp size={18} />
              </a>
              <div>
                <h1 className="font-extralight text-xl text-slate-500">
                  Endereço de Entrega
                </h1>
                <span className="text-slate-600 pl-">
                  Informe o endereço onde deseja receber seu pedido
                </span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleAddressConfirmation)}
              className="flex flex-col gap-2 items-center"
            >
              <Input
                variant="underlined"
                type="number"
                placeholder="CEP"
                {...register("cep")}
              />
              {errors.cep && (
                <span className="text-xs text-red-400">
                  {errors.cep.message}
                </span>
              )}
              <Input
                variant="underlined"
                placeholder="Rua"
                {...register("street")}
              />
              {errors.street && (
                <span className="text-xs text-red-400">
                  {errors.street.message}
                </span>
              )}
              <div className="grid grid-cols-2 w-full gap-2 ">
                <Input
                  variant="underlined"
                  type="number"
                  placeholder="Numero"
                  {...register("streetNumber")}
                />
                <Input
                  variant="underlined"
                  placeholder="Complemento  (opicional)"
                  {...register("complement")}
                />
                {errors.streetNumber && (
                  <span className="text-xs text-red-400">
                    {errors.streetNumber.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 w-full gap-2 ">
                <Input
                  variant="underlined"
                  placeholder="UF"
                  {...register("stateId")}
                />
                <Input
                  variant="underlined"
                  placeholder="Cidade"
                  {...register("city")}
                />
                <Input
                  variant="underlined"
                  placeholder="Bairro"
                  {...register("district")}
                />
                {errors.stateId ? (
                  <span className="text-xs text-red-400">
                    {errors.stateId.message}
                  </span>
                ) : (
                  <a></a>
                )}
                {errors.city ? (
                  <span className="text-xs text-red-400">
                    {errors.city.message}
                  </span>
                ) : (
                  <a></a>
                )}
                {errors.district ? (
                  <span className="text-xs text-red-400">
                    {errors.district.message}
                  </span>
                ) : (
                  <a></a>
                )}
              </div>
              <Button
                disabled={isDirty || isValid ? false : true}
                type="submit"
                variant={"ghost"}
                color={isValid ? "success" : "primary"}
              >
                Confirmar endereço
              </Button>
            </form>
          </div>
        </div>
        {/* PEDIDO */}
        <div className="mx-4 mt-5 p-4 bg-gray-200 rounded-xl">
          <div>
            {/* <h1 className="my-2 border-b border-spacing-5 border-gray-300 font-extralight text-xl text-slate-500 ">Items no carrinho:</h1> */}
            <CartItems />
          </div>
          <div className="flex flex-col items-center">
            <span className="flex py-2 gap-1">
              <a>Valor total: </a>
              <a>R${totalAmount()}</a>
            </span>
            <span className="flex py-2 gap-1">
              <a>Quantidade de Items: </a>
              <a>R${totalItems()}</a>
            </span>
            <Button
              color="success"
              isDisabled={!isValid}
              endContent={<WhatsappLogo />}
              onClick={() => submitOrderToWhatsApp()}
            >
              Enviar pedido
            </Button>
          </div>
        </div>
      </section>
    );
  }
  else{
    return (
      <div className="flex  ">
        <ResizablePanelGroup
          direction="horizontal"
          className=" flex max-w-full m-8  rounded-xl "
        >
          <ResizablePanel className=" pr-4">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel className="bg-gray-200 mb-4 max-h-[130px] ">
                <div className="flex flex-col justify-normal h-full p-4 bg-gren-100 pl-6">
                  <div>
                      <div className="flex gap-2 items-center mb-2 ">
                        <a className="bg-pink-300 rounded-full p-1"><FaRegUser size={18}/></a>
                        <h1 className="font-extralight text-xl">Informações do Cliente</h1>
                      </div>
                    <Label htmlFor="userName" className="text-xs">Nome</Label>
                    <Input 
                      name="usarName" 
                      placeholder="Digite seu nome..." 
                      variant="underlined"
                    />
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel >
                <div className="h-[6000px]: p-6 bg-gray-200">
                <div>
                      <div className=" flex gap-2 items-center mb-3">
                        <a className="bg-violet-300 rounded-full p-1"><IoLocationSharp  size={18}/></a>
                        <div>
                          <h1 className="text-slate-500 font-extralight text-xl">Endereço de Entrega</h1>
                          <span className="text-slate-600 pl-">Informe o endereço onde deseja receber seu pedido</span>

                        </div>
                      </div>
                      
                    <form onSubmit={handleSubmit(handleAddressConfirmation)} className="flex flex-col gap-2 items-center">
                      <Input variant="underlined" type="number" placeholder="CEP" {...register('cep')}/>
                      {errors.cep && <span className="text-xs text-red-400">{errors.cep.message}</span>}
                      <Input variant="underlined" placeholder="Rua" {...register('street')}/>
                      {errors.street && <span className="text-xs text-red-400">{errors.street.message}</span>}
                      <div className="grid grid-cols-2 w-full gap-2 ">
                        <Input variant="underlined" type="number" placeholder="Numero" {...register('streetNumber')}/>
                        <Input variant="underlined" placeholder="Complemento  (opicional)" {...register('complement')}/>
                        {errors.streetNumber && <span className="text-xs text-red-400">{errors.streetNumber.message}</span>}
                      </div>
                      <div className="grid grid-cols-3 w-full gap-2 ">
                        <Input variant="underlined" placeholder="UF" {...register('stateId')}/>
                        <Input variant="underlined" placeholder="Cidade" {...register('city')}/>
                        <Input variant="underlined" placeholder="Bairro" {...register('district')}/>
                        {errors.stateId ? <span className="text-xs text-red-400">{errors.stateId.message}</span> : <a></a>}
                        {errors.city ? <span className="text-xs text-red-400">{errors.city.message}</span> : <a></a>}
                        {errors.district ? <span className="text-xs text-red-400">{errors.district.message}</span> : <a></a>}
                      </div>
                      <Button disabled={isDirty || isValid ? false : true} type='submit' variant={'ghost'} color={isValid ? "success" : "primary"}>Confirmar endereço</Button>
                    </form>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel >
            <div className="flex flex-col min-h-[600px] items-center">
              <div>
                <CartItems />
              </div>
              <div className="flex flex-col items-center  px-20 pb-3 rounded-3xl mt-3">
                <span className="flex py-2 gap-1">
                  <a>Quantidade de Items: </a>
                  <a>{totalItems()}</a>
                </span>
                <span className="flex py-2 gap-1">
                  <a>Valor total: </a>
                  <a>R${totalAmount()}</a>
                </span>
                <Button color="success" isDisabled={!isValid} endContent={<WhatsappLogo />} onClick={() => submitOrderToWhatsApp()}>
                  Enviar pedido
                </Button> 
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    )
  }
}
