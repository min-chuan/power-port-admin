import { reactive, ref } from 'vue';

const usePagination = (loadData: () => Promise<any>, initialPageSize: number = 10) => {
  const pageInfo = reactive({
    page: 1,
    pageSize: 10,
  });

  const handleSizeChange = (val: number) => {
    pageInfo.pageSize = val;
    loadData();
  };

  const handleCurrentChange = (val: number) => {
    pageInfo.page = val;
    loadData();
  };

  const resetPagination = () => {
    pageInfo.page = 1;
    pageInfo.pageSize = initialPageSize;
  };

  const total = ref(0);
  const setTotal = (val: number) => {
    total.value = val;
  };

  return { total, setTotal, pageInfo, handleSizeChange, handleCurrentChange, resetPagination };
};

export default usePagination;
