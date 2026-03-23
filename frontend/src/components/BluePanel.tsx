import { Droplets } from 'lucide-react'

interface BluePanelProps {
  title: string
  badge: string
  waterLevel: number
  threshold: number
  fillPercent: number
  fillColor: string
}

const MAX_CAPACITY = 200
const WARNING_THRESHOLD = 100

const numberFormatter = new Intl.NumberFormat('ko-KR', {
  mininumFractionDigits: 2,
  maxinumFractionDigits: 2,
})

export default function BluePanel({
  className,
  title,
  badge,
  waterLevel,
  threshold,
  fillPercent,
  fillColor,
}: BluePanelProps) {
  const normalizedFill = Math.max(0, Math.min(MAX_CAPACITY, Math.round(fillPercent)))
  const gaugeHeight = Math.round((normalizedFill / MAX_CAPACITY) * 100)
  const thresholdLinePosition = Math.round((WARNING_THRESHOLD / MAX_CAPACITY) * 100)

  const statusColor = badge === '오류' ? '#ef5350' : badge === '정상' ? '#4ade80' : '#9ca3af'
  const statusLabel = badge === '오류' ? '통신오류' : badge === '정상' ? '통신정상' : '미확인'
  const fillGradient = `linear-gradient(180deg, ${fillColor}, rgba(59, 130, 246, 0.45))`

  return (
    <div className={`h-full min-h-[150px] bg-transparent shadow-none ${className ?? ''}`}>
      <div className="flex h-full flex-col justify-between gap-4 rounded-xl border border-slate-700 bg-gradient-to-b from-gray-500 to-gray-700 px-3 pb-3 pt-4 text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(15,23,42,0.16)]">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 pl-1">
            {/* <span className="text-4xl text-blue-500">💧</span> */}
            <Droplets size={30} className="text-blue-500" />
            <span
              className="max-w-[200px] truncate text-2xl font-semibold tracking-[0.06em] text-white"
              title={title}
            >
              {title}
            </span>
          </div>
          <span
            className="flex items-center justify-center rounded px-2 py-1 text-xs font-bold text-slate-700"
            style={{ backgroundColor: statusColor }}
          >
            {statusLabel}
          </span>
        </div>

        {/* 하단: 수위 정보 + 게이지 */}
        <div className="flex items-end justify-between gap-6">
          {/* 왼쪽: 수위 정보 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-25 pl-2">
              <p className="text-xl font-bold tracking-[0.04em] text-white">현재 수위</p>
              <p className="text-2xl font-bold leading-tight text-white">
                {waterLevel.toFixed(2)} m
              </p>
            </div>
            <div className="flex items-baseline justify-between gap-13 pl-2">
              <p className="text-xl font-bold tracking-[0.04em] text-white">임계치</p>
              <p className="text-2xl font-bold leading-tight text-white">
                {threshold.toFixed(2)} m
              </p>
            </div>
          </div>

          {/* 우측: 세로형 게이지 */}
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="relative flex h-[72px] w-[54px] items-end justify-center overflow-hidden rounded-[12px] border border-slate-200 bg-gradient-to-b from-[#e9f2ff] via-[#dbe8ff] to-[#cdddfa] p-1.5 shadow-[0_6px_12px_rgba(59,130,246,0.18)]">
              {/* 게이지 채우기 */}
              <div
                className="absolute inset-x-0 bottom-0 rounded-b-[10px] transition-all duration-500 ease-out"
                style={{
                  height: `${gaugeHeight}%`,
                  background: fillGradient,
                }}
              />
              {/* 100% 기준선 */}
              <div
                className="absolute inset-x-1 h-[1px] border-t-3 border-dashed border-orange-600"
                style={{ bottom: `${thresholdLinePosition}%` }}
              />
              {/* 퍼센트 표시 */}
              <span className="relative mb-1 text-xs font-semibold text-slate-900 drop-shadow-[0_3px_6px_rgba(15,23,42,0.25)]">
                {normalizedFill}%
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-[0.05em] text-white">저수용량</span>
          </div>
        </div>
      </div>
    </div>
  )
}
