"use client"

import { useEffect, useState } from "react";
import styles from './shopping_list.module.css'
import { shopping_list_type } from "./listType";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/loadingSpinner/loadingSpinner";

const ShoppingListComponent = () => {

    const [shoppingList, setShoppingList] = useState<shopping_list_type[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()


    const [delMsg, setDelMsg] = useState('');


    useEffect(() => {
        setShoppingList(JSON.parse(localStorage.getItem('next-shopping')!))
        setLoading(false)
    }, [])


    const onAddMore = () => {
        router.push('/shopping_list/form')
    };


    const onEdit = (index: number) => {
        router.push(`/shopping_list/form?id=${index}`)
    };


    const deleteIngredient = (index: number) => {

        let shopping_list = JSON.parse(localStorage.getItem('next-shopping')!)
        shopping_list.splice(index, 1)
        localStorage.setItem('next-shopping', JSON.stringify(shopping_list));

        // will update and re render dom
        setShoppingList(JSON.parse(localStorage.getItem('next-shopping')!))
    };


    const onDeleteAll = () => {
        // Your delete all logic here
    };


    const onClose = () => {
        setDelMsg('');
    };


    const onOk = () => {
        // Your OK logic here
    };




    if (loading) return <LoadingSpinner />

    return (
        <>


            <div>
                {shoppingList.length > 0 &&
                    <>
                        <section className={styles.Container}>
                            <p className={styles.shop_heading}>
                                <span style={{ color: 'green' }}>S</span>hopping{' '}
                                <span style={{ color: 'green' }}>L</span>ist <i className='bx bx-cart-download'></i>
                            </p>
                            <br />
                            <div className="position-relative">
                                <button className={styles.Btn} onClick={onAddMore}>
                                    <div className={styles.sign}>
                                        <i className='bx bx-cart-download' style={{ color: 'white', fontSize: '20px' }}></i>
                                    </div>
                                    <div className={styles.text}>Add</div>
                                </button>
                            </div>
                        </section>
                        <br />
                        <div className='table-responsive mb-5'>
                            <table className={`${styles.Table} table table-hover text-center`}>
                                <thead className='table-dark'>
                                    <tr>
                                        <th className={styles.th} scope='col'>Qty.</th>
                                        <th className={styles.th} scope='col'>Name</th>
                                        <th className={styles.th} scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shoppingList.map((shoppingData, i) => (
                                        <tr key={i}>
                                            <td>{shoppingData.Ingredient}</td>
                                            <td>{shoppingData.Amount}</td>
                                            <td className='d-flex justify-content-center'>
                                                <div className={`${styles.i_hover} me-1`}>
                                                    <i className='bx bxs-edit me-3 clip1' style={{ cursor: 'pointer' }} onClick={() => onEdit(i)}></i>
                                                </div>
                                                <div className={styles.i_hover}>
                                                    <i className='bx bxs-trash clip2' style={{ cursor: 'pointer' }} onClick={() => deleteIngredient(i)}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{ width: '75%', cursor: 'pointer' }} className='text-end mx-auto py-3'>
                                <a className='link-primary' onClick={onDeleteAll}>
                                    delete All
                                </a>
                            </div>
                        </div>
                    </>
                }

                {shoppingList.length < 1
                    &&
                    <section className={`${styles.info_window} mx-auto`}>
                        <div className={`${styles.add_cart_icon} mt-4`}>
                            <i className='bx bxs-cart-add'></i>
                        </div>
                        <p className={`${styles.info_heading} mt-5`}>Empty Shopping List</p>
                        <p className={`${styles.info_details} mt-3 mb-5`}>
                            Your shopping list seems empty. please click the button to add Ingredients to list.
                        </p>
                        <div className='mt-4'>
                            <button type='button' onClick={onAddMore} className={styles.add_ingredient_btn}>
                                Add Ingredients
                            </button>
                        </div>
                    </section>

                }
            </div>
        </>
    )
}

export default ShoppingListComponent