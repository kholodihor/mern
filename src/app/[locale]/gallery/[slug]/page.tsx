import CarPage from '@/components/pages/gallery/car-page'
import React from 'react'

const Car = ({ params }: { params: { slug: string } }) => {
  return (
    <CarPage slug={params.slug} />
  )
}

export default Car
