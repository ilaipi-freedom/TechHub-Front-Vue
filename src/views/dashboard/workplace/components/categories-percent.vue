<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        padding: '20px',
      }"
    >
      <template #title>首聊时间段分布</template>
      <Chart height="310px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { EChartsOption } from 'echarts';

  import useLoading from '@/hooks/loading';
  import { groupByPeriod } from '@/api/dashboard';
  import { keyBy, sumBy } from 'lodash';

  const { loading } = useLoading();
  const chartOption = ref<EChartsOption>({});
  const fetchData = async () => {
    const {
      data: { data, timePeriod },
    } = await groupByPeriod();
    const dataMap = keyBy(data as Array<any>, 'timePeriod');
    const totalCustomerNum = sumBy(data, (row: any) => Number(row.count));
    const colors = [
      '#3D72F6',
      '#249EFF',
      '#A079DC',
      '#313CA9',
      '#6CAAF5',
      '#21CCFF',
    ];
    const series0Data = timePeriod.map((period: string, idx: number) => ({
      name: period,
      value: [dataMap[period.split(':')[0]].count],
      itemStyle: { color: colors[idx] },
    }));
    chartOption.value = {
      legend: {
        left: 'center',
        data: timePeriod,
        bottom: 0,
        icon: 'circle',
        itemWidth: 8,
        textStyle: {
          color: '#4E5969',
        },
        itemStyle: {
          borderWidth: 0,
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
      },
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: '40%',
            style: {
              text: '客户总数',
              textAlign: 'center',
              fill: '#4E5969',
              fontSize: 14,
            },
          },
          {
            type: 'text',
            left: 'center',
            top: '50%',
            style: {
              text: totalCustomerNum,
              textAlign: 'center',
              fill: '#1D2129',
              fontSize: 16,
              fontWeight: 500,
            },
          },
        ],
      },
      series: [
        {
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{d}%',
            fontSize: 14,
            color: '#4E5969',
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          data: series0Data,
        },
      ],
    } as EChartsOption;
  };
  fetchData();
</script>

<style scoped lang="less"></style>
