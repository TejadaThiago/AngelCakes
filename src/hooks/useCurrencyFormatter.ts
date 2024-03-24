/* eslint-disable @typescript-eslint/no-explicit-any */

function useCurrencyFormatter(amount: number | null): string {
  // const [amountBRL, setamountBRL] = useState<string>("");

  // useEffect(() => {
  //   if (amount !== null && typeof amount === 'number') {
      
  //     setamountBRL(formattedValue);
  //   } else {
  //     setamountBRL("");
  //   }
  // }, [amount]);

  const formattedValue:any = amount?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return formattedValue;
}

export default useCurrencyFormatter;
