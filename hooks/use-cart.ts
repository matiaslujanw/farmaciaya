'use client'

import { useLocalStorage } from './use-local-storage'

export interface CartItem {
  productId: string
  name: string
  brand: string
  presentation: string
  price?: number
  quantity: number
}

export function useCart() {
  const [items, setItems] = useLocalStorage<CartItem[]>('farmaciaya-cart', [])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((current) => {
      const existingIndex = current.findIndex((i) => i.productId === item.productId)
      if (existingIndex >= 0) {
        const updated = [...current]
        updated[existingIndex].quantity += 1
        return updated
      }
      return [...current, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }
}
