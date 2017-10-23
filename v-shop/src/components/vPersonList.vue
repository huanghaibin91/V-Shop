<template>
    <div class="person-list">
        <Button type="primary" icon="person-add">添加新员工</Button>
        <div class="person-message">

            <Collapse v-model="value">
                <Panel name="1">
                    &nbsp;&nbsp;详细信息
                    <p slot="content">
                        史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。
                    </p>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            value: '1'
        }
    }
}
</script>

<style>

</style>
