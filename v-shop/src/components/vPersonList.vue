<template>
    <div class="person-list">
        <div>
            <Button type="primary" icon="person-add">添加新员工</Button>
        </div>
        <div class="person-message">
            <Table :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    align: 'center',
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '姓名',
                    width: 100,
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '职位',
                    width: 100,
                    align: 'center',
                    key: 'position'
                },
                {
                    title: '权限',
                    width: 100,
                    align: 'center',
                    key: 'jurisdiction'
                },
                {
                    title: '联系电话',
                    align: 'center',
                    key: 'telephone'
                },
                {
                    title: '家庭住址',
                    align: 'center',
                    key: 'address'
                }
            ],
            data: [
                {
                    name: '小张',
                    position: '店长',
                    jurisdiction: '一级',
                    telephone: '17721259651',
                    address: '成都市武侯区新南门路8号'
                }
            ]
        }
    }
}
</script>

<style>

</style>
