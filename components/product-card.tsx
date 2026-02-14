'use client'

import React from "react"

import Link from 'next/link'
import { ShoppingCart, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      presentation: product.presentation,
      price: product.price,
    })
    toast.success('Agregado al carrito')
  }

  return (
    <Link href={`/producto/${product.id}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] group">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
            <Badge variant={product.isAvailable ? 'default' : 'secondary'} className="shrink-0">
              {product.isAvailable ? (
                <CheckCircle2 className="mr-1 h-3 w-3" />
              ) : (
                <XCircle className="mr-1 h-3 w-3" />
              )}
              {product.isAvailable ? 'Disponible' : 'Sin stock'}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {product.presentation}
          </p>

          {product.price && (
            <p className="text-lg font-bold text-primary">
              ${product.price.toLocaleString('es-AR')}
            </p>
          )}
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="w-full gap-2"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
            {product.isAvailable ? 'Agregar' : 'No disponible'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
