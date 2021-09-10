import React from 'react';
import './css/Tutorials.css'
import gsap from 'gsap'

const Tutorials = () => {


        let openThisTutorial = (element) => {
            if (element.classList.contains('tutorial-open')) {
                gsap.to(element.children[1], {
                    height: 0,
                    duration: 0.4,
                    ease: 'power4.out'
                })
            } else {
                gsap.to(element.children[1], {
                    height: 'auto',
                    duration: 0.4,
                    ease: 'power4.out'
                })
            }
            element.classList.toggle('tutorial-open')
        }


        //tutorials
        let tutorials = [
            {
                index: 0,
                day: 'پیش آموزش',
                title: 'کلیات پوست',
                details: '',
                duration: 20,
                tutorials: [
                    {
                        title: 'کلیات پوست (١)',
                        link: 'https://m.aparat.com/v/rQ7HS'
                    },
                    {
                        title: 'انواع پوست (٢)',
                        link: 'https://m.aparat.com/v/gmS0F'
                    },
                    {
                        title: 'لک های پوستی (٣)',
                        link: 'https://m.aparat.com/v/C6zEs'
                    },
                    {
                        title: 'پیری پوست (۴)',
                        link: 'https://m.aparat.com/v/ReXnf'
                    },
                    {
                        title: 'آکنه و جوش (۵)',
                        link: 'https://m.aparat.com/v/7Q3ZS'
                    },
                    {
                        title: 'مراقبت مو (۶)',
                        link: 'https://m.aparat.com/v/6nq7H'
                    },
                    {
                        title: 'توزیع فرم مشاوره (روز دوم)',
                        link: 'https://m.aparat.com/v/7pEIw'
                    },

                ]
            },


            {
                index: 1,
                day: 'روز اول',
                title: 'جلسه آموزش تجارت',
                details: '',
                duration: 20,
                tutorials: [
                    {
                        title: 'آموزش تجارت',
                        link: 'https://m.aparat.com/v/8JYTL'
                    },
                    {
                        title: 'آموزش لیست',
                        link: 'https://m.aparat.com/v/lQCJB'
                    },
                    {
                        title: 'آموزش dmo',
                        link: 'https://m.aparat.com/v/NdrJF'
                    },

                ]
            },


            {
                index: 2,
                day: 'روز دوم',
                title: 'فرم مشاوره',
                details: '',
                duration: 20,
                tasks: [
                    {
                        title: 'توضیع 5 قرم مشاوره'
                    }
                ],

                tutorials: [
                    {
                        title: 'توزیع فرم مشاوره (روز دوم)',
                        link: 'https://m.aparat.com/v/7pEIw'
                    }
                ]
            },

            {
                index: 3,
                day: 'روز سوم',
                title: 'فروش',
                details: '',
                duration: 20,
                tasks: [
                    {
                        title: 'توضیع 5 قرم مشاوره'
                    }
                ],

                tutorials: [
                    {
                        title: 'فروش قسمت اول',
                        link: 'https://m.aparat.com/v/LXKrC'
                    },
                    {
                        title: 'فروش قسمت دوم',
                        link: 'https://m.aparat.com/v/LXKrC'
                    },
                    {
                        title: 'پیگیری مشتری',
                        link: 'https://m.aparat.com/v/JgwxY'
                    },
                    {
                        title: 'دفترچه در مسیر فروش',
                        link: 'https://m.aparat.com/v/3IMaR'
                    },


                ]
            },

            {
                index: 4,
                day: 'روز چهارم',
                title: 'آموزشی مهارت',
                details: '',
                duration: 20,
                tasks: [
                    {
                        title: 'توضیع 5 قرم مشاوره'
                    },
                    {
                        title: 'مشاوره دادن ۵فرم اولی'
                    },
                ],

                tutorials: [
                    {
                        title: 'کارگاه اموزشی دعوتپیگیریمشاوره',
                        link: 'https://m.aparat.com/v/NC9MW'
                    },



                ]
            },

        ]

        return (
            <div style={{
                // background:'white',
                padding: 10,
                maxHeight: 'calc(100vh - 50px)',

            }} className={'w-100 hide-scroll-bar h-100 position-relative d-flex flex-column align-items-center'}
                 id={'container'}>
                <div className={'w-75 p-3 mb-3'} style={{
                    borderRadius: 5,
                    background: 'white'
                }}>
                <span
                    className={'w-100 text-center d-flex flex-row align-items-center justify-content-center IranSans mb-3 '}>شماره تلفن جهت یاد آوری آموزش</span>
                    <div className={'d-flex justify-content-around flex-column align-items-center'}>
                        <input type="text" id={'customerName'} className={'newCustomerInput w-75 mt-0'} dir={'rtl'}
                               placeholder={'شماره تلفن'}/>


                        <button style={{
                            height: 40,
                            paddingTop: 10
                        }} className={'btn mt-2 btn-outline-success IranSans '}>
                            ثبت شماره
                        </button>

                    </div>
                </div>

                {
                    tutorials.map(eachTutorial => {
                        return (

                            <div style={{
                                borderRadius: 5,
                                background: 'white'
                            }} id={'tutorial-0'} className={'each-tutorial-section mt-3 w-100 border shadow-sm'}

                            >
                                <div style={{
                                    cursor: 'pointer'
                                }}
                                     onClick={(e) => {
                                         openThisTutorial(e.currentTarget.parentElement)
                                     }}
                                     className={'each-tutorial-section-header d-flex flex-row-reverse justify-content-between align-items-center px-3 py-2'}>
                                    <div className={'d-flex flex-row-reverse align-items-center'}>
                                        <i style={{
                                            color: '#9d9d9d',
                                            fontSize: '2rem'
                                        }} className={'fa fa-lock'}/>
                                        <div className={'d-flex flex-row-reverse mr-4'}>
                                            <h5 className={'IranSans'} style={{
                                                paddingTop: 10
                                            }}>{eachTutorial.day} : {eachTutorial.title}</h5>
                                            <div className={'d-flex pt-2 mr-5'}>
                                                <span>دقیقه</span>
                                                <span className={'mx-1'}>{eachTutorial.duration}</span>
                                            </div>
                                        </div>

                                    </div>


                                    <i className={'fa fa-angle-down angle'}/>

                                </div>
                                <div style={{
                                    height: 0
                                }} className={'each-tutorial-body px-2 d-flex flex-column align-content-center'}>
                                    {eachTutorial.tutorials.map(eachSubTutorial => {
                                        return (
                                            <div
                                                className={'d-flex flex-column justify-content-center align-content-center mt-1 mb-3'}>
                                                <h5 className={'IranSans text-center'}>{eachSubTutorial.title}</h5>
                                                <div className="h_iframe-aparat_embed_frame text-center">
                                                    <iframe
                                                        src="https://www.aparat.com/video/video/embed/videohash/rQ7HS/vt/frame"
                                                        title="کلیات پوست (١)" allowFullScreen="true"/>
                                                </div>
                                                <form className={'text-center'} action={eachSubTutorial.link}>
                                                    <button type={'submit'} className={'btn btn-info'}>مشاهده در آپارات
                                                    </button>
                                                </form>
                                            </div>

                                        )


                                    })}

                                </div>
                            </div>

                        )
                    })
                }


            </div>
        );
    }
;

export default Tutorials;