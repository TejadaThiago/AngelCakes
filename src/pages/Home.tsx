import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { createClient } from '@supabase/supabase-js';
import { Database } from "@/types/supabase";
import { useState, useEffect } from 'react';

export type CakeProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageName?: string;
  tags?: string[];
}

export function Home() {
  const [cakes, setCakes] = useState<CakeProps[]>([]);

  useEffect(() => {
    async function getDataFromDatabase() {
      const supabase = createClient<Database>(
        'https://ekkgcolzyqhwyiswndlu.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVra2djb2x6eXFod3lpc3duZGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MDg5MTQsImV4cCI6MjAyNjE4NDkxNH0.L6gOzSG6G_Rcd0vUZ-KCRm20Pe_65ubD63MdGRvFozk'
      );

      const { data, error } = await supabase
        .from('Cakes')
        .select('*')
        .eq('available', true);

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setCakes(data || []);
      }
    }

    getDataFromDatabase();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <section className="mx-5 flex-wrap md:mx-40 ">
      <Header />

      <h1 className="mt-6 font-bold text-3xl">Nossos Bolinhos</h1>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center mx-0 my-8 gap-y-10 ">
        {cakes.map(cake => (
          <div key={cake.id} className="flex md:flex-1">
            <ProductCard
              id={cake.id}
              title={cake.title}
              description={cake.description}
              price={cake.price}
              imageName={`https://ekkgcolzyqhwyiswndlu.supabase.co/storage/v1/object/public/CakesImages/${cake.imageName}.png`}
              tags={cake.tags}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
