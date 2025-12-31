'use client'

import { useUserStore } from '@/stores/user'
import { generateCardNumber } from '@/utils'

export function MemberCard() {
  const { userInfo } = useUserStore()

  const cardNumber = userInfo?.id
    ? generateCardNumber(userInfo.id)
    : ['0000', '0000', '0000', '0000']

  return (
    <div
      className='group h-[250px] w-[400px] cursor-pointer'
      style={{ perspective: '1000px' }}
    >
      <div
        className='group-hover:transform-[rotateY(180deg)] h-full w-full transition-transform duration-700'
        style={{
          transformStyle: 'preserve-3d',
          animation: 'flip 2.5s ease',
        }}
      >
        <div
          className='absolute h-full w-full overflow-hidden rounded-[15px] text-white shadow-[0_1px_10px_1px_rgba(0,0,0,0.3)]'
          style={{
            backgroundImage: 'linear-gradient(to right, #111, #555)',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            textShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            className='absolute right-0 h-full bg-linear-to-b from-[#ff6767] to-[#ff4545] shadow-[0_0_10px_0px_rgba(0,0,0,0.5)]'
            style={{
              width: '200px',
              transform: 'skewX(-15deg) translateX(50px)',
            }}
          />
          <div
            className='absolute right-0 h-full bg-linear-to-b from-[#ff6767] to-[#ff4545] shadow-[0_0_10px_0px_rgba(0,0,0,0.5)]'
            style={{
              width: '180px',
              transform: 'skewX(20deg) translateX(50px)',
            }}
          />

          <div className='absolute top-[30px] right-[25px] text-4xl'>🍟</div>

          <div className='relative top-[30px] left-[25px] uppercase'>
            shutiao
          </div>

          <div
            className='relative top-[60px] left-[25px] flex h-10 w-[50px] items-center justify-center overflow-hidden rounded-[5px]'
            style={{
              backgroundImage:
                'linear-gradient(to bottom left, #ffecc7, #d0b978)',
            }}
          >
            <div
              className='absolute h-px w-full bg-[#333]'
              style={{ top: '13px' }}
            />
            <div
              className='absolute h-px w-full bg-[#333]'
              style={{ top: '20px' }}
            />
            <div
              className='absolute h-px w-full bg-[#333]'
              style={{ top: '28px' }}
            />
            <div className='absolute left-[25px] h-[50px] w-px bg-[#333]' />
            <div
              className='z-1 h-[25px] w-5 rounded-[3px] border border-[#333]'
              style={{
                backgroundImage:
                  'linear-gradient(to bottom left, #efdbab, #e1cb94)',
              }}
            />
          </div>

          <svg
            className='relative top-5 left-[100px]'
            viewBox='0 3.71 26.959 38.787'
            width='26.959'
            height='38.787'
            fill='white'
            role='img'
            aria-label='Wave pattern'
          >
            <path d='M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z' />
            <path d='M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z' />
            <path d='M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z' />
          </svg>

          <div className="relative mx-[25px] mt-10 flex items-center justify-between font-['cc_font',monospace] text-[23px]">
            <div>{cardNumber[0]}</div>
            <div>{cardNumber[1]}</div>
            <div>{cardNumber[2]}</div>
            <div>{cardNumber[3]}</div>
          </div>

          <div className="ml-[25px] font-['cc_font',monospace] uppercase">
            <span className='text-[9px] text-white/80'>created:</span>
            <span className='ml-1'>
              {userInfo?.createdAt
                ? new Date(userInfo.createdAt).toLocaleDateString()
                : ''}
            </span>
          </div>

          <div className="mx-[25px] mt-2.5 font-['cc_font',monospace]">
            {userInfo?.bonjourId ?? 'undefined'}
          </div>

          <div className='absolute right-5 bottom-5 flex'>
            <div className='h-[25px] w-[25px] rounded-full bg-[#eb001b]' />
            <div
              className='ml-[-10px] h-[25px] w-[25px] rounded-full'
              style={{ backgroundColor: 'rgba(255, 209, 0, 0.7)' }}
            />
          </div>
        </div>

        <div
          className='absolute h-full w-full overflow-hidden rounded-[15px] text-white shadow-[0_1px_10px_1px_rgba(0,0,0,0.3)]'
          style={{
            background: '#9e9e9e',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(0)',
            textShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className='absolute top-[30px] left-0 h-[50px] w-full bg-black' />

          <div className='absolute top-[110px] right-0 left-0 mx-auto h-9 w-[90%] rounded-[5px] bg-white px-2.5 text-right text-black tracking-wider'>
            <span className='mt-[-22px] mb-[12px] block text-[10px] text-white uppercase'>
              ccv
            </span>
            <div className='flex h-full items-center justify-end'>
              {userInfo?.memberId
                ? String(userInfo.memberId).padStart(6, '0')
                : '0000'}
            </div>
          </div>

          <div className='absolute top-[150px] right-0 left-0 my-5 px-5 text-center text-[10px]'>
            <p>You'll regret 100% of the fries you don't take.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
