export const currencies = [
  { key: 'ru', text: 'руб.', value: 'RUB', id: 'RUB' },
  { key: 'us', text: '$', value: 'USD', id: 'USD' },
  { key: 'kz', text: 'тенге', value: 'KZT', id:'KZT' },
]

export const formPresets = [
    {
        "id": "psdfkvjn",
        "title": "Preset1",
        "form": {
            "value": 34,
            "costs": 4
        }

    },
    {
        "id": "xoiucnw",
        "title": "Best",
        "form": {
            "value": 34234,
            "costs": 33
        }
    }
]

export const formDesign = {
        "investments": [
            {
            "id": "investments1",
            "label": "Стоимость аппарата",
            "name": "investments1",

            },


        ],
        "services": [
            {
            "id": "services1",
            "label": "Аппаратная процедура",
            "name": "services1",
            },


        ],
        "costs": [
            {
            "id": "costs1",
            "label": "Налоги, заработная плата и др. расходы",
            "name": "costs1",
            },


        ],
        "consumables": [
            {
            "id": "consumables1",
            "label": "Расходный материал",
            "name": "consumables1",
            }

        ],
        "initialValues":{
            "investments": [
                {
               "input": 2000,
                "currency": "usd"
                },

            ],

        }
}

export const formDesigns = [
    {
        "id": "psdfkvjn",
        "title": "Aroma",
        "description": "Диодный лазер для удаления волос от компании Новые технологии красоты",
        "imgSrc": "/images/Aroma.jpg",
        "link": "http://newbeautytech.ru/catalog/aroma-grand/",
        "formDesign": {
            "investments": [
                {
                "id": "investments1",
                "label": "Стоимость аппарата",
                "name": "investments1",
    
                },
                {
                "id": "investments2",
                "label": "Стоимость доставки",
                "name": "investments2",
    
                },
    
            ],
            "services": [
                {
                "id": "services1",
                "label": "Аппаратная процедура",
                "name": "services1",
                },
    
    
            ],
            "costs": [
                {
                "id": "costs1",
                "label": "Налоги, заработная плата и др. расходы",
                "name": "costs1",
                },
    
    
            ],
            "consumables": [
                {
                "id": "consumables1",
                "label": "Расходный материал",
                "name": "consumables1",
                }
    
            ],
            "initialValues":{
                "investments": [
                    {
                    "input": 3500,
                    "currency": "USD"
                    },
                    {
                    "input": 60000,
                    "currency": "RUB"                    
                    }
    
                ],
                "services": [
                    {
                    "input": 8000,
                    "currency": "RUB",
                    "min": 1,
                    "max": 5
                    },
                ],
                "costs": [
                    {
                    "input": 13,
                    },
                ],
                "global": 
                    {
                    "currency": "RUB",
                    },
                            
            }
            }

    },
    {
        "id": "pfffdsjn",
        "title": "Pentagon",
        "description": "Фракционный СО2 лазер с опцией интравагинального омоложения от компании Новые технологии красоты",
        "imgSrc": "/images/Pentagon.jpg",
        "link": "http://newbeautytech.ru/catalog/pentagon-grand/",
        "formDesign": {
        "investments": [
            {
            "id": "investments1",
            "label": "Стоимость аппарата",
            "name": "investments1",

            },


        ],
        "services": [
            {
            "id": "services1",
            "label": "Лазерное омоложение",
            "name": "services1",
            },


        ],
        "costs": [
            {
            "id": "costs1",
            "label": "Налоги, заработная плата и др. расходы",
            "name": "costs1",
            },


        ],
        "consumables": [

        ],
        "initialValues":{
            "investments1input": 35000,
            "investments1inputcurrency": "usd",
            "services1input": 6000,
            "services1inputcurrency": "rub",
            "services1inputRangeMin": 0,
            "services1inputRangeMax": 4,
            "costs1input": 25


        }
        }

    },
    {
        "id": "default",
        "title": "Базовый",
        "description": "Базовые настройки для типового аппарата",
        "imgSrc": "/images/Shemax.jpg",           
        "formDesign": {
        "investments": [
            {
            "id": "investments1",
            "label": "Стоимость аппарата",
            "name": "investments1",

            },
            {
            "id": "investments2",
            "label": "Стоимость доставки",
            "name": "investments2",

            },

        ],
        "services": [
            {
            "id": "services1",
            "label": "Аппаратная процедура",
            "name": "services1",
            },


        ],
        "costs": [
            {
            "id": "costs1",
            "label": "Налоги, заработная плата и др. расходы",
            "name": "costs1",
            },


        ],
        "consumables": [
            {
            "id": "consumables1",
            "label": "Расходный материал",
            "name": "consumables1",
            }

        ],
        "initialValues":{
            "investments": [
                {
                "input": 2000,
                "currency": "USD"
                },
                {
                "input": 60000,
                "currency": "RUB"                    
                }

            ],
            "services": [
                {
                "input": 3000,
                "currency": "RUB",
                "min": 1,
                "max": 5
                },
            ],
            "costs": [
                {
                "input": 13,
                },
            ],
            "global": 
                {
                "currency": "RUB",
                },
                        
        }
        }

    }

]

