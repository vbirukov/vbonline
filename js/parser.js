/*
 * Открываем файл: i.MX53RM.pdf
 * Контроллер называется: i.MX53
 * Рассмотрим модуль    : ESDCTL (chapter 28)
 * Рассмотрим несколько 
 * регистров из него    : Programmable Registers (page 1229)
 *                        - ESDCTL  (page 1233)
 *                        - ESDOTC  (page 1237)
 *                        - ESDCFG0 (page 1239)
 *                        - ESDCFG1 (page 1240)
 *                        - ESDCFG2 (page 1243)
 * Задача:
 * 1. Организовать удобную структуру, с описанием как читать значения полей из 
      различных регистров. Необходимо учесть иерархию: 
        контроллер -> модуль -> регистр (см. объект registers)
   2. Реализовать преобразование значения, заданного пользователем, в 
      список полей соответствующий структуре того или иного регистра, со 
      значениями этих полей.
   3. Данные вводятся в виде 32 битного (4 байта), числа в шестнадцатеричном 
      формате: (старший бит) 0x00000000 (младший бит)
 */
 
// Структура для хранения описания регистров, для различных контроллеров и их 
// модулей
var registers = {
  "i.MX53": {
      "ESDCTL": {
      "ESDCTL" : {
        SDE_0: {
          address: 31,
          mask: '1',
          values:  {
            1: 'ON',
            0: 'OFF'
          }
        },
        SDE_1: {
          address: 30,
          mask: '1',
          values: {
            1: "ON",
            0: "OFF"
          }
        },
        ROW:  {
          address: 24,
          mask: 7,
          range: {'value': [0, 5]},
          values: {
            0: '$11$ bits row',
            1: '12 bits row',
            2: '13 bits row',
            3: '14 bits row',
            4: '15 bits row',
            5: '16 bits row',
            'other': 'reserved',
         }
        },
        COL: {
          address: 20,
          mask: 7,
          values: {
            0: "9 bits column",
            1: "10 bits column",
            2: "11 bits column",
            3: "8 bits column",
            4: "12 bits column",
            "other": "Reserved"
          }
        },
        BL: {
          address: 19,
          mask: 1,
          values: {
            0: 'Burst Length 4 is used',
            1: 'Burst length 8 is used',
          }
        },
        DSIZ: {
          address: 16,
          mask: 1,
          values: {
            0: '16-bit memory width',
            1: '32-bit memory width',
          }
        }
       },
      "ESDOTC" : {
        tAOFPD: {
          address: 27,
          mask: 7,
          values: {
            0: '1 cycle',
            1: '2 cycles',
            6: '7 cycles',
            7: '8 cycles',
            'other': 'unknown',
          },
        },
        tAONPD: {
          address: 24,
          mask: 7,
          values: {
            0: "1 cycle",
            1: "2 cycles",
            6: "7 cycles",
            7: "8 cycles",
            "other": "unknown"
          }
        },
        tANPD: {
          address: 20,
          mask: 0xF,
          values:  {
                0: '1 clock',
                1: '2 clocks',
                2: '3 clocks',
                14:'15 clocks',
                15: '16 clocks',
                'other': 'unknown',
            }
        },
        tAXPD: {
          address: 16,
          mask: 15,
          values: 'range_min=2% range_max=15% add 1% $unknown% keyword clocks%',
        },
        tODLTon: {
          address: 12,
          mask: 7,
          values: {
            0: 'reserved',
            1: '2 cycles',
            2: '3 cycles',
            3: '4 cycles',
            4: '5 cycles',
            5: '6 cycles',
            6: '7 cycles',
            7: 'reserved',
          },
        },
        tODT_idle_off: {
          address: 4,
          mask: 31,
          values: {
            0: '0 cycles',
            1: '1 cycle',
            2: '2 cycles',
            30: '30 cycles',
            31: '31 cycles',
            'other': 'unknown',
          },
        }
      },
      "ESDCFG0": {
        tRFC: {
          address: 24,
          mask: 255,
          values: 'range_min=3% range_max=254% add 1% $unknown% keyword clocks%'
        },
        tXS: {
          address: 16,
          mask: 255,
          values: 'range_min=3% range_max=254% add 1% $unknown% keyword clocks%'
        },
        tXP: {
          address: 13,
          mask: 7,
          values: 'range_min=2% range_max=7% add 1% $unknown% wordcycles%',
        },
        tXPDLL: {
          address: 9,
          mask: 15,
          values: 'range_min=2% range_max=14% add 1% $unknown% keyword clocks%',
        },
        tFAW: {
          address: 4,
          mask: 31,
          values: 'range_min=2% range_max=30% add 1% $unknown% keyword clocks%',
        },
        tCL: {
          address: 0,
          mask: 15,
          values: 'range_min=8% range_max=15% add 3% $unknown% keyword cycles%',
        },
      },
      "ESDCFG1": {
        tRCD: {
          address: 29,
          mask: 7,
          values: 'range_min=8% range_max=9% add 1% $unknown% clocks',
        },
        tRP: {
          address: 26,
          mask: 7,
          values: 'range_min=8% range_max=9% add 1% $unknown% clocks',
        },
        tRC: {
          address: 21,
          mask: 31,
          values: 'range_min=2% range_max=30% add 1% $unknown% clocks'
        },
        tRAS: {
          address: 16,
          mask: 31,
          values: {
            0: '1 clock',
            1: '2 clocks',
            2: '3 clocks',
            30: '31 clocks',
            31: 'reserved',
            'other': 'unknown',
          },
        },
        tRPA: {
            address: 15,
            mask: 1,
            values: function(bit_data) {
              return (parseInt(document.getElementById('reg_value').value, 16) >> this.address & this.mask) + 1 + bit_data + ' clocks';
            },
        },
        tWR: {
          address: 9,
          mask: 7,
          values: 'range_min=8% range_max=9% add 1% $unknown% clocks'
        },
        tMRD: {
          address: 5,
          mask: 15,
          values: 'range_min=3% range_max=15% add 1% $unknown% clocks',
        },
        tCWL: {
          address: 0,
          mask: 7,
          values: {
            0: '2cycles (DDR2/DDR3) , 1 cycle (LPDDR2)',
            1: '3cycles (DDR2/DDR3) , 2 cycles (LPDDR2)',
            2: '4cycles (DDR2/DDR3) , 3 cycles (LPDDR2)',
            3: '5cycles (DDR2/DDR3) , 4 cycles (LPDDR2)',
            4: '6cycles (DDR2/DDR3) , 5 cycles (LPDDR2)',
            5: '7cycles (DDR2/DDR3) , 6 cycles (LPDDR2)',
            6: '8cycles (DDR2/DDR3) , 7 cycles (LPDDR2)',
            7: 'Reserved',
          }
        },
      },
      "ESDCFG2": {
        tDLLK: {
          address: 16,
          mask: 511,
          values: {
            0: '1 cycle',
            1: '2 cycles',
            2: '3 cycles',
            199: '200 cycles (JEDEC value for DDR2)',
            510: '511 cycles',
            511: '512 cycles (JEDEC value for DDR3)',
            'other': 'unknown',
          }
        },
        tRTP: {
          address: 6,
          mask: 7,
          values: 'range_min=9% range_max=10% add 1% $unknown% cycles',
        },
        tWTR: {
          address: 3,
          mask: 7,
          values: 'range_min=9% range_max=10% add 1% $unknown% cycles',
        },
        tRRD: {
          address: 0,
          mask: 7,
          values: 'range_min=6% range_max=10% add 1% $Reserved% cycles',
        },
      },
    }
  }
};

/* function putSelectors() {
  for (controller in registers) {
    var option = document.createElement('option');
    option.value = controller;
    option.innerText = controller;
    document.getElementById('controller').appendChild(option);
      for(unit in registers[controller]) {
        var unt = document.createElement('option');
        unt.value = unit;
        unt.innerText = unit;
        document.getElementById('ctl_unit').appendChild(unt);
          for (register in registers[controller][unit]) {
            var reg = document.createElement('option');
            reg.value = register;
            reg.innerText = register;
            document.getElementById('unit_register').appendChild(reg);
          }
      }
  }
} */

//составляем список модулей по ключам объекта и впихиваем в селектор
function putSelectors(id, node_number) {

  var registers_path = '';

  //создаем список селекторов
  var child_nodes = document.getElementsByTagName('select');

  //обрабокта загрузки страницы
  if ( node_number == 0 ) {
    registers_path = 'empty';
   } else {
    registers_path = child_nodes[node_number-1].value;
  }

  //очищаем все селекторы, идущие после активного, чтобы списки не стакились
  //автоматически добавляется поле "выберите контроллер"
  for (var i = node_number; i < 3; i++) {
    clearSelectors(child_nodes[i].id);
  };

  //если была выбрана опция "выберите контроллер" то мы просто очищаем все селекторы
  //после данного, что уже было сделано на стр 130
  //напрашивается вопрос: зачем городить обработку ненудного, по сути, поля.
  //отвечаем.
  //Если нет какого-нибудь базового селектора, то в поле контроллера
  //будет всего одна строчка и при ее выборе не будет события
  //onchange() на котрое и вызывается данная функция
  if (registers_path == 'empty' && node_number != 0) {
    return NaN
  } else {
    //смотрим, откуда пришел вызов
    switch (node_number) {
      case 0:
      {
        //составляем "путь" до нужного уровнля влоежния объекта с контроллерами
        registers_path = '';
        addSelectors('controller', registers_path);
        break
      }
      case 1:
      {
        registers_path = child_nodes[0].value;
        addSelectors('ctl_unit', registers_path);
        break
      }
      case 2:
      {
        registers_path = child_nodes[0].value + "/" + child_nodes[1].value;
        addSelectors('unit_register', registers_path);
      }
    }
  }


}

// Типовой парсинг. Подходит для многих регистров.
// Как правило в вариантах значений есть два-три значения при битах от 0 до 3
// и несколько "верхних" значений. между ними "провал" из reserved значений
// их то мы и отсекаем с помощью range_set

//учим прогу добираться до нужного уровня вложеения объекта
Object.prototype.getByPath = function(path) {
  var nodes = path.constructor !== Array ? path.split('/') : path;
  if (nodes.length > 0) {
    var member = this[nodes.shift()];
    if (member !== undefined) {
      if (nodes.length == 0) {
        return member;
      }
      return member.constructor === Object ? member.getByPath(nodes) : member;
    }
  }
  return undefined;
}

//очистка списка
 function clearSelectors(id) {
   var current_selector = document.getElementById(id);
   var list = current_selector.childNodes;
   for (i = 0, max = list.length; i < max; i++) {
     current_selector.removeChild(document.getElementById(id).lastChild);
   }

   //добавляем "Пустой" селктор
    var option = document.createElement('option');
    option.value = 'empty';

   //это меня Дэнчик научил
    option.innerText = {
      'controller'   : 'выберите контроллер',
      "ctl_unit"     : 'выберите модуль',
      "unit_register": 'выберите регистр',
    }[id];
  current_selector.appendChild(option);

}

//добавление списка на страницу
 function addSelectors(id, registers_path) {

   //смотрим "путь" до нужного уровня вложения
   registers_path = registers.getByPath(registers_path);
   registers_path = registers_path ? registers_path : registers;

   //составляем объект для парсинга
   //и тут же добавляем их на страницу
   for (key in registers_path) {
     var member = registers_path[key];
     if (member.constructor !== Object) {
       continue
     }
     var option = document.createElement('option');
     option.value = key;
     option.innerText = key;
     document.getElementById(id).appendChild(option);
   }
 }

function handler() {
  outPut(parse());
}

//парсинг как таковой
function parse() {

  //берем значения селекторов, для составления пути до нужного объекта
  var key_one   = document.getElementById("controller").value;
  var key_two   = document.getElementById("ctl_unit").value;
  var key_three = document.getElementById("unit_register").value;


  var bits = function() {
    var result = {};
    var data   = parseInt(document.getElementById('reg_value').value, 16);
    console.log('DBG Data BIN:' + data.toString(2));
    var obj = registers[key_one][key_two][key_three];
    for ( x in obj ) {
      if (x == 'getByPath') {
        continue
      }
      result[x] = function ()  {

        var bit_data = ( data >> obj[x].address ) & obj[x].mask;
        var values = obj[x].values;
        switch(values.constructor) {
          case Object: {
            var val = values[bit_data];
            console.log("DBG: val = " + (val ? val : values.other));
            return (val ? val : values.other);
          }
          case String:  { values = function() {
            range_min = values.match(/range_min=([^range_a=]+)\%/)[1];
            range_max = values.match(/range_max=([^range_b=]+)\%/)[1];
            add_to_bin = values.match(/add ([^add ]+)\%/)[1];
              if (bit_data > range_min && bit_data < range_max) {
                return values.match(/\$([^\$\%]+)\%/)[1]
              } else {
                return String(bit_data + parseInt(add_to_bin)) + ' ' + values.match(/(clocks|cycles)/)[1]
              }
            }();
            return values
          }
          default: return values(bit_data);
            /* {
            var reserved = false;
            values = values.replace(/\%([^\%]+)\%/g, function (str, expr) {
              //console.log("str: " + str + "; expr: " + expr + "; eval: " + eval(expr));
              var param = obj[x];
              if (param.range && param.range.value &&
                  param.range.value[0] <= bit_data && 
                  bit_data <= param.range.value[1]) {
                return eval(expr);
              }
              reserved = true;
              return expr;
            });
            if (reserved) {
              values = "Reserved";
            }
            console.log("DBG: values = " + values);
            return values;
          } */
         // case Function: {
         //   return values(bit_data);
         // }
        }}();
    };
    return result
  }();
  console.log("DBG   копирование ключей: " + JSON.stringify(bits));

  return bits
}


function outPut(bits) {
  if (document.getElementById('outTable')) {
       document.getElementById('reg_fields').removeChild(document.getElementById('outTable')); }
  var out_table = document.createElement('table');
  out_table.id = 'outTable';
  for (key in bits) {
    if (bits[key].constructor == Function) {
      continue
    }
    var row = out_table.insertRow();
    row.insertCell().innerText = key;
    row.insertCell().innerText = bits[key];
  };
  document.getElementById('reg_fields').appendChild(out_table);
}
