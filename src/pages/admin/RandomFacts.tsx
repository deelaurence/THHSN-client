import React, { useEffect } from 'react'
import { RootState, AppDispatch } from '../../store/store'
import { fetchFacts } from '../../store/randomFacts'
import { useDispatch,useSelector } from 'react-redux'
import PageHeader from '../../components/PageHeader'
import Loader from '../../components/Loader'
import SingleLineError from '../../components/errors/SingleLineError'
import { Sdk } from '../../utils/sdk'
import Button from '../../components/Button'


const RandomFacts = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(fetchFacts())
    },[])

    const refreshFacts=()=>{
        dispatch(fetchFacts())
    }



    const {facts,status,error} = useSelector((state:RootState)=>{
       return state.facts 
    })
    console.log(facts)

    return (
    <section className='px-6'>
        <div className=' min-h-64'>
            <PageHeader heading='' accent='Do you know?' backToLabel='dashboard' backToRoute={new Sdk().adminDashboardRoute}/>
            {status==='loading'&&<Loader/>}
            {status==='failed'&&<SingleLineError errorMessage={error||"Something went wrong"}/>}
            {status==='succeeded'&&<p>{facts}</p>}

        </div>
        <Button size='large' onClick={refreshFacts} extraClass='mt-12' loading={false} label='refresh'/>
    </section>
  )
}

export default RandomFacts