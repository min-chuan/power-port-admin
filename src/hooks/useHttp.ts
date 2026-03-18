import { post } from '@/utils/http';
import { onMounted, reactive, ref } from 'vue';
const baseURL = import.meta.env.VITE_BASE_URL;

export function useHttp<T, U extends object>(url: string, initialParams: U) {
  const dataList = ref<T[]>([]);
  const loading = ref(false);
  const total = ref(0);
  const pageInfo = reactive({
    page: 1,
    pageSize: 10,
  });
  const searchParams = ref<U>({ ...initialParams });

  const loadData = async () => {
    try {
      loading.value = true;
      const res = await post<any, { list: T[]; total: number }>(`${baseURL}${url}`, {
        ...pageInfo,
        ...searchParams.value,
      });
      if (res.data) {
        total.value = res.data.total;
        dataList.value = res.data.list;
      }
    } catch (err) {
      console.log('error', err);
    } finally {
      loading.value = false;
    }
  };

  const handleSizeChange = (val: number) => {
    pageInfo.pageSize = val;
    loadData();
  };

  const handleCurrentChange = (val: number) => {
    pageInfo.page = val;
    loadData();
  };

  const handleReset = () => {
    searchParams.value = { ...initialParams };
    pageInfo.page = 1;
    pageInfo.pageSize = 10;
    loadData();
  };

  onMounted(() => {
    loadData();
  });

  return {
    dataList,
    loading,
    total,
    pageInfo,
    searchParams,
    loadData,
    handleSizeChange,
    handleCurrentChange,
    handleReset,
  };
}
