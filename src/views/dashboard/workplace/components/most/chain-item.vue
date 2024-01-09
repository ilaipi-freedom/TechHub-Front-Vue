<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :title="title">
      <div class="content">
        <a-statistic
          :value="count"
          :show-group-separator="true"
          :value-from="0"
          animation
        />
        <a-typography-text
          class="percent-text"
          :type="isUp ? 'danger' : 'success'"
        >
          {{ growth }}%
          <icon-arrow-rise v-if="isUp" />
          <icon-arrow-fall v-else />
        </a-typography-text>
      </div>
      <div class="chart">
        <Chart :option="chartOption" />
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import useChartOption from '@/hooks/chart-option';
  import { statisticsMostPaid } from '@/api/dashboard';

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    quota: {
      type: String,
      default: '',
    },
    chartType: {
      type: String,
      default: '',
    },
  });
  const { loading, setLoading } = useLoading(true);
  const count = ref(0);
  const growth = ref(100);
  const isUp = computed(() => growth.value > 50);
  const chartData = ref<any>([]);
  const chartCategories = ref<string[]>([]);
  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: chartCategories.value,
      },
      yAxis: {
        show: false,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      series: [
        {
          data: chartData.value,
          ...(props.chartType === 'bar'
            ? {
                type: 'bar',
                barWidth: 7,
                barGap: '0',
              }
            : {
                type: 'line',
                showSymbol: false,
                smooth: true,
                lineStyle: {
                  color: '#4080FF',
                },
              }),
        },
      ],
    };
  });

  const fetchData = async () => {
    setLoading(true);
    const {
      data: { top5, totalPaid },
    } = await statisticsMostPaid(props.quota);
    count.value = Number(totalPaid) || 0;
    top5.forEach((el: any) => {
      chartCategories.value.push(`V: ${el.weixin}`);
      chartData.value.push({
        value: el.amount || el.paymentCount,
        label: '累计支付金额',
        itemStyle: {
          color: '#468DFF',
        },
      });
    });
    setLoading(false);
  };
  fetchData();
</script>

<style scoped lang="less">
  .general-card {
    min-height: 204px;
  }
  .content {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;
  }
  .percent-text {
    margin-left: 16px;
  }
  .chart {
    width: 100%;
    height: 80px;
    vertical-align: bottom;
  }

  .unit {
    padding-left: 8px;
    font-size: 12px;
  }

  .label {
    padding-right: 8px;
    font-size: 12px;
  }
</style>
