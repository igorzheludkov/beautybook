import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import DashNav from '../../components/dashnav'
import MasterNav from '../../components/masternav'
import dash from '../../styles/dash.module.css'
import s from '../../styles/services_add.module.css'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import Cloudinary from '../../lib/cloudinary'
import { server } from '../../config/index'
import ScrollBox from '../../components/scrollbox'

export default function ServicesAddPage({ user, data }) {
    const categories = data.categories
    const poslugi = data.poslugi

    console.log(data);

    const servicesModel = {
        // ownerId:
        owner: user.email,
        cat_top: '',
        cat_parent: '',
        cat_service: '',
        about: [],
        popularity: '',
        item_1: [],
        item_2: [],
        item_3: [],
        pic: [],
    }
    const [serv, setServ] = useState(servicesModel)
    console.log(serv)

    function checkboxToggle(e) {
        e.target.checked
            ? setServ({ ...serv, cat_top: [...serv.cat_top, e.target.value] })
            : setServ({ ...serv, cat_top: serv.cat_top.filter((i) => i !== e.target.value) })
    }

    function inputHandler(e) {
        let id = e.target.id
        let type = e.target.dataset.type
        let value = e.target.value

        setServ({ ...serv, [id]: { ...serv[id], opt: id, [type]: value } })
    }

    function photoHandler(result) {
        setServ((items) => ({ ...items, pic: [...items.pic, result.secure_url] }))
    }

    async function pushData(e) {
        e.preventDefault(e)
        const response = await fetch('/api/services_api', {
            method: 'POST',
            body: JSON.stringify(serv),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        console.log('Sended')
        console.log(data)
    }

    return (
        <div className={s.serv_wrapper}>
            <Head>
                <title>Додати послугу</title>
            </Head>
            <MasterNav />
            <Script src='https://upload-widget.cloudinary.com/global/all.js' strategy='afterInteractive' />

            <div className='container'>
                <h3>Виберіть розділ</h3>
                <div className='specialization'>
                    <ScrollBox data={categories} checkboxToggle={checkboxToggle} checkStatus={serv.cat_top} />
                </div>
                <div className='sub_main'></div>
                <h3>
                    Вкажіть нижче назву послуги своїми словами.
                </h3>
                <div className={s.form}>
                    <span className={s.serv_item}>
                        <input
                            className={s.input_serv}
                            id='item_1'
                            data-type='name'
                            onChange={inputHandler}
                            placeholder='Введіть назву'
                        />
                        <input
                            className={s.input_serv}
                            id='item_1'
                            data-type='price'
                            onChange={inputHandler}
                            placeholder='Ціна'
                        />
                        <input
                            className={s.input_serv}
                            id='item_1'
                            data-type='dur'
                            onChange={inputHandler}
                            placeholder='Хв'
                        />
                    </span>
                    <p>Додайте варіації, якщо є. </p>
                    <span className={s.serv_item}>
                        <input
                            className={s.input_serv}
                            id='item_2'
                            data-type='name'
                            onChange={inputHandler}
                            placeholder='Введіть назву'
                        />
                        <input
                            className={s.input_serv}
                            id='item_2'
                            data-type='price'
                            onChange={inputHandler}
                            placeholder='Ціна'
                        />
                        <input
                            className={s.input_serv}
                            id='item_2'
                            data-type='dur'
                            onChange={inputHandler}
                            placeholder='Хв'
                        />
                    </span>
                    <span className={s.serv_item}>
                        <input
                            className={s.input_serv}
                            id='item_3'
                            data-type='name'
                            onChange={inputHandler}
                            placeholder='Введіть назву'
                        />
                        <input
                            className={s.input_serv}
                            id='item_3'
                            data-type='price'
                            onChange={inputHandler}
                            placeholder='Ціна'
                        />
                        <input
                            className={s.input_serv}
                            id='item_3'
                            data-type='dur'
                            onChange={inputHandler}
                            placeholder='Хв'
                        />
                    </span>
                    <input
                        className={s.input_desc}
                        id='about'
                        data-type='description'
                        onChange={inputHandler}
                        placeholder='Додайте коротки опис'
                    />
                    <p>Додайте фото (до 8 шт)</p><br></br>
                    <div className={s.photo_wrapper}>
                        {serv.pic.map((i) => (
                            <div key={i} className={s.photo_container}>
                                <Image
                                    style={{ borderRadius: '10px' }}
                                    layout='responsive'
                                    objectFit='cover'
                                    width={80}
                                    height={80}
                                    src={i ? i : '/images/userplaceholder.png'}
                                    alt='serv_pic'
                                />
                            </div>
                        ))}
                    </div>
                    <div className={s.images_wrapper}>
                        <Cloudinary uploadHandler={photoHandler} multiple={true} />
                    </div>
                </div>
                <button className={s.btn_add} onClick={pushData}>
                    Додати послугу
                </button>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
        return {}
    }
    const res = await fetch(`${server}/api/categories`, {
        method: 'GET',
    })
    const cat = await res.json()
    return {
        props: {
            user: session.user,
            data: cat,
        },
    }
}
