
<template>
    
</template>

<script>
export default {
    methods: {
        getUsersExec() {
            function getMembers20k(group_id, members_count) {
                var code =  'var members = API.friends.get({"user_id": ' + user.uid + ', "v": "5.92", "sort": "id_asc", "count": "1000", "offset": ' + membersGroups.length + '}).items;' // делаем первый запрос и создаем массив
                +	'var offset = 1000;' // это сдвиг по участникам группы
                +	'while (offset < 25000 && (offset + ' + membersGroups.length + ') < ' + members_count + ')' // пока не получили 20000 и не прошлись по всем участникам
                +	'{'
                    +	'members = members + "," + API.groups.getMembers({"group_id": ' + group_id + ', "v": "5.27", "sort": "id_asc", "count": "1000", "offset": (' + membersGroups.length + ' + offset)}).items;' // сдвиг участников на offset + мощность массива
                    +	'offset = offset + 1000;' // увеличиваем сдвиг на 1000
                +	'};'
                +	'return members;'; // вернуть массив members
        
                VK.Api.call("execute", {code: code}, function(data) {
                if (data.response) {
                membersGroups = membersGroups.concat(JSON.parse("[" + data.response + "]")); // запишем это в массив
                $('.member_ids').html('Загрузка: ' + membersGroups.length + '/' + members_count);
                if (members_count >  membersGroups.length) // если еще не всех участников получили
                    setTimeout(function() { getMembers20k(group_id, members_count); }, 333); // задержка 0.333 с. после чего запустим еще раз
                else // если конец то
                    alert('Ура тест закончен! В массиве membersGroups теперь ' + membersGroups.length + ' элементов.');
                } else {
                alert(data.error.error_msg); // в случае ошибки выведем её
                    }
                });
            }
        }
    }

}
</script>

<style>

</style>
