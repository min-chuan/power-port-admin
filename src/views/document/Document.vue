<template>
  <el-card>
    <TagSelect v-model="select[0]" class="mt" :tag-list="sort.type" />
    <TagSelect v-model="select[1]" class="mt" :tag-list="sort.important" />
    <TagSelect v-model="select[2]" class="mt" :tag-list="sort.publish" />
    <el-divider></el-divider>
    <div class="mt">
      <span>已选:</span>
      <template v-for="(item, index) in select" :key="index">
        <el-tag
          v-show="item !== '全部'"
          type="success"
          class="ml"
          closable
          @close="handleClose(index)"
        >
          {{ item }}
        </el-tag>
      </template>
    </div>
  </el-card>
  <el-button type="primary" class="mt mb" @click="exportToHTML">导出富文本到HTML文件</el-button>
  <Editor
    id="<uid>"
    v-model="editorContent"
    api-key="e6ac3c9h0udp74qif07zmmoxmcrxv826i8r6dejgmj2liyj1"
    :init="{
      language: 'zh-CN',
      plugins:
        'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
      toolbar:
        'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      height: 500,
    }"
  />
  <el-button type="primary" class="mt">发布文章</el-button>
</template>
<script setup lang="ts">
import { documentApi } from '@/api/document';
import type { SortType } from '@/types/document';
import Editor from '@tinymce/tinymce-vue';
import { onMounted, reactive, ref } from 'vue';
import TagSelect from './components/TagSelect.vue';
const sort = ref<SortType>({
  type: [],
  important: [],
  publish: [],
});
const select = reactive(['全部', '全部', '全部']);
const loadData = async () => {
  try {
    const res = await documentApi();
    if (res.data) {
      console.log('xxx', res.data);
      sort.value = res.data;
    }
  } catch (err) {
    console.log('error', err);
  }
};

onMounted(() => {
  loadData();
});

const handleClose = (index: number) => {
  select[index] = '全部';
};

/* 富文本编辑器 */
const editorContent = ref('');

/* 导出到HTML */
const exportToHTML = () => {
  const blob = new Blob([editorContent.value], { type: 'text/HTML' });
  const link = document.createElement('a');
  link.download = 'document.html';
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
</style>
