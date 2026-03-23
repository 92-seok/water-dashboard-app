import { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import BluePanel from '../components/BluePanel'

// dayjs 한국어 로케일 설정
dayjs.locale('ko')

interface Device {
  CD_DIST_OBSV: string
  NM_DIST_OBSV: string
  Data: string | number
  SeeLevelUse: string | number
  ErrorChk: number
}

export default function HomeView() {
  const [currentTime, setCurrentTime] = useState('')
  const [devices, setDevices] = useState<Device[]>([])
  const [averagePercent, setAveragePercent] = useState(0)
  const [showExitModal, setShowExitModal] = useState(false)
  const [countdown, setCountdown] = useState(3)

  // 현재 시각 갱신 (1초 마다)
  useEffect(() => {
    const updateTime = () => {
      const formatted = dayjs().format('YYYY-MM-DD HH:mm:ss')
      setCurrentTime(formatted)
    }

    updateTime()
    const timeInterval = setInterval(updateTime, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  // 데이터 갱신 (20초 마다)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Device[]>('/api/devices')
        setDevices(response.data)

        // 평균 저수율 계산
        const validDevices = response.data.filter((d) => d.ErrorChk > 0)
        if (validDevices.length > 0) {
          const sum = validDevices.reduce((acc, d) => {
            const waterLevel = parseInt(String(d.Data)) || 0
            const threshold = parseInt(String(d.SeeLevelUse)) || 1
            return acc + (waterLevel / threshold) * 100
          }, 0)
          setAveragePercent(sum / validDevices.length)
        }
      } catch (error) {
        console.error('데이터 로드 실패: ', error)
        // API 실패 시 더미 데이터 표시
        setDevices([
          { CD_DIST_OBSV: '01', NM_DIST_OBSV: '저수지1', Data: 1.0, SeeLevelUse: 5.5, ErrorChk: 1 },
          {
            CD_DIST_OBSV: '02',
            NM_DIST_OBSV: '저수지2',
            Data: 10.65,
            SeeLevelUse: 5.9,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '03',
            NM_DIST_OBSV: '저수지3',
            Data: 5.12,
            SeeLevelUse: 5.08,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '04',
            NM_DIST_OBSV: '저수지4',
            Data: 4.82,
            SeeLevelUse: 4.1,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '05',
            NM_DIST_OBSV: '저수지5',
            Data: 2.36,
            SeeLevelUse: 2.25,
            ErrorChk: 0,
          },
          {
            CD_DIST_OBSV: '06',
            NM_DIST_OBSV: '저수지6',
            Data: 3.18,
            SeeLevelUse: 2.9,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '07',
            NM_DIST_OBSV: '저수지7',
            Data: 1.58,
            SeeLevelUse: 5.6,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '08',
            NM_DIST_OBSV: '저수지8',
            Data: 4.01,
            SeeLevelUse: 4.0,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '09',
            NM_DIST_OBSV: '저수지9',
            Data: 3.17,
            SeeLevelUse: 3.1,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '10',
            NM_DIST_OBSV: '저수지10',
            Data: 4.2,
            SeeLevelUse: 4.4,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '11',
            NM_DIST_OBSV: '저수지11',
            Data: 5.12,
            SeeLevelUse: 5.5,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '12',
            NM_DIST_OBSV: '저수지12',
            Data: 1.89,
            SeeLevelUse: 1.87,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '13',
            NM_DIST_OBSV: '저수지13',
            Data: 3.01,
            SeeLevelUse: 3.0,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '14',
            NM_DIST_OBSV: '저수지14',
            Data: 0.01,
            SeeLevelUse: 5.1,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '15',
            NM_DIST_OBSV: '저수지15',
            Data: 2.79,
            SeeLevelUse: 2.45,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '16',
            NM_DIST_OBSV: '저수지16',
            Data: 4.03,
            SeeLevelUse: 4.01,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '17',
            NM_DIST_OBSV: '저수지17',
            Data: 2.64,
            SeeLevelUse: 2.57,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '18',
            NM_DIST_OBSV: '저수지18',
            Data: 3.19,
            SeeLevelUse: 3.2,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '19',
            NM_DIST_OBSV: '저수지19',
            Data: 4.83,
            SeeLevelUse: 5.27,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '20',
            NM_DIST_OBSV: '저수지20',
            Data: 3.21,
            SeeLevelUse: 3.2,
            ErrorChk: 1,
          },
          {
            CD_DIST_OBSV: '21',
            NM_DIST_OBSV: '저수지21',
            Data: 4.37,
            SeeLevelUse: 4.4,
            ErrorChk: 1,
          },
        ])
        setAveragePercent(85.3)
      }
    }

    fetchData()
    const dataInterval = setInterval(fetchData, 20000)
    return () => clearInterval(dataInterval)
  }, [])

  // 우클릭 종료 모달
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setShowExitModal(true)
      setCountdown(3)
    }

    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  // 카운트다운 타이머
  useEffect(() => {
    if (!showExitModal) return

    if (countdown === 0) {
      setShowExitModal(false)
      window.close()
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [showExitModal, countdown])

  // 풀 스크린 토글
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // 현재 화면이 아니면 전체화면으로 전환
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('전체화면 전환 실패: ', err)
      })
    } else {
      // 전제 화면이면 해제
      document.exitFullscreen().catch((err) => {
        console.error('전체화면 해제 실패: ', err)
      })
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault()
        toggleFullscreen()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-[#111827] bg-slate-800">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-6 pt-6 pb-4">
        <div>
          <h1 className="text-5xl font-semibold tracking-[0.08em] text-white">
            안성 수위 통합 모니터링
          </h1>
          <p className="mt-4 text-xl tracking-[0.08em] text-slate-100">
            주요 관측소 실시간 수위 · 임계치 · 통신 상태
          </p>
        </div>
        <div className="text-right" onClick={toggleFullscreen}>
          <div className="text-6xl font-medium text-white">{currentTime}</div>
        </div>
        <div className="text-right">
          <p className="text-4xl font-medium text-white">총 저수율</p>
          <p className="text-6xl font-semibold tracking-wide text-orange-400">
            {averagePercent.toFixed(1)}%
          </p>
        </div>
      </header>

      {/* 패널 그리드 */}
      <div className="flex-1 px-6 pb-6">
        <div className="h-full select-none">
          <div className="grid h-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 auto-rows-[1fr]">
            {devices.map((device) => {
              const waterLevel = parseInt(String(device.Data)) || 0
              const threshold = parseInt(String(device.SeeLevelUse)) || 1
              const fillPercent = (waterLevel / threshold) * 100
              const badge = device.ErrorChk > 0 ? '정상' : '오류'

              return (
                <div key={device.CD_DIST_OBSV} className="flex min-h-0 min-w-0">
                  <BluePanel
                    className="h-full w-full"
                    title={device.NM_DIST_OBSV}
                    badge={badge}
                    waterLevel={waterLevel}
                    threshold={threshold}
                    fillPercent={fillPercent}
                    fillColor="#2f7df6"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 우클릭 종료 모달 */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-200 rounded-2xl border border-white/20 bg-[#1f2937] px-10 py-10 text-center text-white shadow-2xl">
            <p className="mt-3 text-3xl font-medium">{countdown}초 후 자동으로 종료됩니다.</p>
          </div>
        </div>
      )}
    </div>
  )
}
