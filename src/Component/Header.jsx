import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
        <Link to="/products">Products</Link>
        <Link to="/timmer">timer</Link>
    </div>
  )
}
