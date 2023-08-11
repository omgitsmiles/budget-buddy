import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import CategoryCard from './CategoryCard'
import Navbar from './Navbar'
import BudgetTable from './BudgetTable'
import { Heading, Text, Container } from '@chakra-ui/react'
import Loading from './Loading'

const Category = ({  user, setUser }) => {
    const { id } = useParams()
    const [category, setCategory] = useState()

    //   useEffect(() => { 
    //    let thisCategory = categories.find(cat => cat.id === parseInt(id))
    //     setCategory(thisCategory)
    // }, [])


    useEffect(() => { 
        fetch(`/categories/${id}`)
        .then(res => res.json())
        .then(category => {
            setCategory(category)
        })
    }, [])

    // console.log(category)
  if (!category){
    return (
      <>
        <Navbar setUser={setUser} user={user}/>
        <Loading/>
      </>
    )
  }
  return (
    <>
        <Navbar setUser={setUser} user={user}/>
        <br />
        <Container padding="10px" alignItems="center">
          <CategoryCard fromBudget={false} key={category.id} category={category} />
        </Container>
        
        <br/>
        <BudgetTable fromBudget={false} transactions={category.expenses}/>
        {}
    </>
  )
}

export default Category