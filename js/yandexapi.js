window.addEventListener('DOMContentLoaded', () => {
    ymaps.ready(init);
    let map;
    //Коллекции
    let higherCollection
    let filteredCollection
    //массивы
    let higherEducation
    let fillteredEducation
    let sortCollection
    let activeBtn = true
    let checkActiveBtn
    let vr_btn = document.querySelector('#vr_btn')
    let ar_btn = document.querySelector("#ar_btn")
    let robotBtn = document.querySelector('#robot_btn')

    async function init() {

        let center = [61.782062911598075, 85.32215890189144]
        map = await new ymaps.Map(
            'map',
            {
                center: center,
                zoom: 3,
                controls: [],
                behaviors: ['default', 'scrollZoom']
            },
            {
                searchControlProvider: 'yandex#search'
            });

        map.controls.remove('searchControl')
        map.controls.remove('trafficControl');
        higherCollection = new ymaps.GeoObjectCollection(null, {});
        filteredCollection = new ymaps.GeoObjectCollection(null, {})

        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="atlas_modal_box">' +
            '<img src="./img/atlas_legend.png" class="atlas_modal_img">' +
            '<p class="atlas_modal_text">' + '$[[options.contentLayout minWidth=650]]' +
            '</p>' +
            ' </div>'
            , {
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._element = document.querySelector('.atlas_modal_box').parentElement
                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },
                applyElementOffset: function () {
                    document.querySelector('.atlas_modal_box').style.top = (-80 + 'px')
                    document.querySelector('.atlas_modal_box').style.left = (30 + 'px')
                },

            })

        fillteredEducation = [
            {
                title: "ФИНЭК",
                desk: "adasasdasd",
                latitude: 15.06252622511122,
                longitude: 98.99731322616615,
                rang: 'vr',
                type: 'add'
            },
            {
                title: "ФИНЭ",
                desk: "adasasdasd",
                latitude: 34.90765560419258,
                longitude: 62.274258541957394,
                rang: 'ar',
                type: 'add'
            },
            {
                title: "ФИНЭ",
                desk: "adasasdasd",
                latitude: 36.90765560419258,
                longitude: 64.274258541957394,
                rang: 'robot',
                type: 'add'
            },
            {
                title: "СПБГУ",
                desk: "aa",
                latitude: 45.06252622511122,
                longitude: 38.99731322616615,
                rang: 'vr',
                type: 'aver'
            },
            {
                title: "СПБГУ",
                desk: "aa",
                latitude: 48.06252622511122,
                longitude: 33.99731322616615,
                rang: 'robot',
                type: 'aver'
            },

            {
                title: "СПБГУ",
                desk: "aaa",
                latitude: 54.90765560419258,
                longitude: 52.274258541957394,
                rang: 'ar',
                type: 'aver'
            },
            {
                title: "ФГАОУ ВО «Национальный исследовательский ядерный университет «МИФИ»",
                city: 'Москва',
                subtitle: "Федеральное государственное автономное образовательное учреждение высшего образования «Национальный исследовательский ядерный университет «МИФИ»",
                direction: "15.03.06 – Мехатроника и робототехника",
                description: "Осуществляется практическая подготовка бакалавров, способных успешно работать в сфере деятельности, связанной с разработкой и сопровождением эксплуатации мехатронных, киберфизических и робототехнических систем в атомной промышленности и других высокотехнологичных отраслях.",
                format: "бакалавриат - 4 года",
                citizen: 'https://eng.mephi.ru/academics/admissions',
                latitude: 50.582061,
                longitude: 36.596484,
                rang: 'vr',
                type: 'high'
            },
            {
                title: "ФГАОУ ВО «Белгородский государственный технологический университет им. В.Г. Шухова»",
                city: 'Белгород',
                subtitle: "Федеральное государственное автономное образовательное учреждение высшего образования «Национальный исследовательский ядерный университет «МИФИ»",
                direction: "15.03.06 – Мехатроника и робототехника",
                description: "Область профессиональной деятельности выпускников, освоивших программу: цифровые методы и средства проектирования, математического, физического и компьютерного моделирования технологических процессов. Выпускники разрабатывают инновационные технологии и их цифровые двойники для самых перспективных отраслей промышленности – автомобиле-, авиа-, ракетостроения, энергетики и атомной промышленности и эффективно их внедряют на производстве.",
                format: "бакалавриат - 4 года",
                citizen: 'https://eng.mephi.ru/academics/admissions',
                latitude: 55.649803162,
                longitude: 37.664463043,
                rang: 'ar',
                type: 'high'
            },
            {
                title: "ФГАОУ ВО «Белгородский государственный технологический университет им. В.Г. Шухова»",
                city: 'Белгород',
                subtitle: "Федеральное государственное автономное образовательное учреждение высшего образования «Национальный исследовательский ядерный университет «МИФИ»",
                direction: "15.03.06 – Мехатроника и робототехника",
                description: "Область профессиональной деятельности выпускников, освоивших программу: цифровые методы и средства проектирования, математического, физического и компьютерного моделирования технологических процессов. Выпускники разрабатывают инновационные технологии и их цифровые двойники для самых перспективных отраслей промышленности – автомобиле-, авиа-, ракетостроения, энергетики и атомной промышленности и эффективно их внедряют на производстве.",
                format: "бакалавриат - 4 года",
                citizen: 'https://eng.mephi.ru/academics/admissions',
                latitude: 15.649803162,
                longitude: 57.664463043,
                rang: 'robot',
                type: 'high'
            }
        ]

        filterEduc = () => {
            for (let i = 0; i < fillteredEducation.length; i++) {
                fillteredEducation.forEach((item) => {
                    let iconImageHref
                    if (item.type === 'high') {
                        iconImageHref = '../img/red_circle.png'
                    } else if (item.type === 'aver') {
                        iconImageHref = '../img/blue-circle.png'
                    } else if (item.type === 'add') {
                        iconImageHref = '../img/yellow-cirlce.png'
                    }

                    let myPlacemark = new ymaps.Placemark([item.latitude, item.longitude], {
                        hintContent: item.title,
                        balloonContent: item.title,
                        item,
                    }, {
                        balloonShadow: false,
                        balloonLayout: MyBalloonLayout,
                        iconLayout: 'default#imageWithContent',
                        iconImageHref,
                        iconImageSize: [20, 20],
                        iconImageOffset: [0, 0],

                    })
                    filteredCollection.add(myPlacemark, item.rang)
                    myPlacemark.events
                        .add('click', function (e) {
                            atlasWindow.style.display = 'flex'
                            document.querySelector(".modal-city").textContent = `г. ${item.city}`
                            document.querySelector(".modal-title").textContent = item.title
                            document.querySelector(".direction").textContent = item.direction
                            document.querySelector(".format").textContent = item.format
                            document.querySelector(".description").textContent = item.description
                            document.querySelector(".citizen").href = item.citizen
                        })

                        .add('balloonopen', function(e){
                            if (item.type === 'high') {
                                e.get('target').options.set('iconImageHref', '../img/activeMark.png')
                            } else if (item.type === 'aver') {
                                e.get('target').options.set('iconImageHref', '../img/blueActiveMark.png')
                            } else if (item.type === 'add') {
                                e.get('target').options.set('iconImageHref', '../img/orangeactiveMark.png')
                            }
                    })

                        .add('balloonclose', (e)=>{
                            if (item.type === 'high') {
                                myPlacemark.options.set('iconImageHref', '../img/red_circle.png')
                            } else if (item.type === 'aver') {
                                myPlacemark.options.set('iconImageHref', '../img/blue-circle.png')
                            } else if (item.type === 'add') {
                                myPlacemark.options.set('iconImageHref', '../img/yellow-cirlce.png')

                            }
                        })
                        .add('hintopen', function(e){
                            if (item.type === 'high') {
                                e.get('target').options.set('iconImageHref', '../img/activeMark.png')
                            } else if (item.type === 'aver') {
                                e.get('target').options.set('iconImageHref', '../img/blueActiveMark.png')
                            } else if (item.type === 'add') {
                                e.get('target').options.set('iconImageHref', '../img/orangeactiveMark.png')
                            }
                        })
                })
            }
            return fillteredEducation
        }
        let ZoomLayout = ymaps.templateLayoutFactory.createClass("" +
                "<div class='atlas_zoom'>" +
                "<div id='zoom-in'><img src='../img/atlas_plus.svg' alt=''></div><br>" +
                "<div id='zoom-out'><img src='../img/atlas_minus.svg' alt='minus'></div>" +
                "</div>", {

                build: function () {
                    ZoomLayout.superclass.build.call(this);
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    $('#zoom-in').bind('click', this.zoomInCallback);
                    $('#zoom-out').bind('click', this.zoomOutCallback);
                },

                clear: function () {
                    $('#zoom-in').unbind('click', this.zoomInCallback);
                    $('#zoom-out').unbind('click', this.zoomOutCallback);

                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function () {
                    let map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
                },

                zoomOut: function () {
                    let map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
                }
            }),
            zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});
        map.controls
            .add('typeSelector', {
                float: 'none',
                position: {
                    right: 40,
                    top: 30
                }
            })
            .add(zoomControl)
            .add("geolocationControl", {
                float: 'right',
                position: {
                    right: 50,
                    top: 200
                }
            })
        map.geoObjects.add(filteredCollection)
        filterEduc()
        return map
    }


    /*Активность кнопок фильтров*/

    let atlasWindow = document.querySelector('.atlas_modal')
    let higherBtn = document.querySelectorAll('.atlas_btn_item')
    let higheduc = document.querySelector('#higherCollection')
    let additional = document.querySelector('#additionalCollection')
    let average = document.querySelector('#averageCollection')

    let firstRequest = "select uni_name, short_name, uni_city, latitude, longitude, direction, uni_description, form, url, uni_level, vrarrob from university where "
    let secondRequest = "select uni_name, short_name, uni_city, latitude, longitude, direction, uni_description, form, url, uni_level, vrarrob from university where "
    let resultRequest = ""
    let str1 = ""
    let str2 = ""

    higherBtn.forEach((item) => {
        item.addEventListener("click", (ev) => {
            if (item.classList.contains('active_btn')) {
                item.classList.remove('active_btn')
                if (item.id === 'higherCollection') {
                    firstRequest = firstRequest.replace("uni_level='ВО' OR ", '')
                }
                if (item.id === 'averageCollection') {
                    firstRequest = firstRequest.replace("uni_level='СПО' OR ", '')
                }
                if (item.id === 'additionalCollection') {
                    firstRequest = firstRequest.replace("uni_level='ДПО' OR ", '')
                }
                if (item.id === 'vr_btn') {
                    secondRequest = secondRequest.replace("vrarrob like '%VR%' OR ", '')
                }
                if (item.id === 'ar_btn') {
                    secondRequest = secondRequest.replace("vrarrob like '%AR%' OR ", '')
                }
                if (item.id === 'robot_btn') {
                    secondRequest = secondRequest.replace("vrarrob like '%робототехника%' OR ", '')
                }
                if (firstRequest.endsWith(" OR ")) {
                    str1 = firstRequest.slice(0, -4)
                }
                if (secondRequest.endsWith(" OR ")) {
                    str2 = secondRequest.slice(0, -4)
                }

            } else {
                item.classList.add('active_btn')
            }

            /*-----------------------------Фильтрация по HigherEducation------------------------------------------------------*/

            if (item.id === 'higherCollection' && higheduc.classList.contains('active_btn')) {
                firstRequest += "uni_level='ВО' OR "
            }
            if (item.id === 'averageCollection' && average.classList.contains('active_btn')) {
                firstRequest += "uni_level='СПО' OR "
            }
            if (item.id === 'additionalCollection' && additional.classList.contains('active_btn')) {
                firstRequest += " uni_level='ДПО' OR "
            }

            if (item.id === 'vr_btn' && vr_btn.classList.contains('active_btn')) {
                secondRequest += "vrarrob like '%VR%' OR "
            }
            if (item.id === 'ar_btn' && ar_btn.classList.contains('active_btn')) {
                secondRequest += "vrarrob like '%AR%' OR "
            }
            if (item.id === 'robot_btn' && robotBtn.classList.contains('active_btn')) {
                secondRequest += "vrarrob like '%робототехника%' OR "
            }

            if (firstRequest.endsWith(" OR ")) {
                str1 = firstRequest.slice(0, -4)
            }
            if (secondRequest.endsWith(" OR ")) {
                str2 = secondRequest.slice(0, -4)
            }

            if (str1 !== '' && str2 !== '') {
                resultRequest = `${str1}  INTERSECT  ${str2}`
            } else if(str1 ===  '') {
                resultRequest = str2
            }else if(str2 === ''){
                resultRequest = str1
            } else {
                resultRequest = str1
            }

            if (!higheduc.classList.contains('active_btn') && !average.classList.contains('active_btn') && !additional.classList.contains('active_btn') && !vr_btn.classList.contains('active_btn') && !ar_btn.classList.contains('active_btn') && !robotBtn.classList.contains('active_btn')) {
                str2 =""
                str1 =""
                resultRequest = "select uni_name, short_name, uni_city, latitude, longitude, direction, uni_description, form, url, uni_level, vrarrob from university"
            }
            console.log(resultRequest)
        })

    })
})






