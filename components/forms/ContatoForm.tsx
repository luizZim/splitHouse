'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle } from 'lucide-react'
import { WHATSAPP_NUMBER, buildContatoMessage } from '@/lib/whatsapp'
import { ClientWhatsAppButton } from '@/components/ui/ClientWhatsAppButton'

const schema = z.object({
  nome: z.string().min(2, 'Informe seu nome'),
  telefone: z.string().optional(),
  mensagem: z.string().min(10, 'Mensagem muito curta (mínimo 10 caracteres)'),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'w-full px-4 py-3.5 font-sans text-[14px] border-[1.5px] border-gray-300 rounded-lg outline-none text-[#1A1A2E] bg-white transition-colors focus:border-brand mt-1.5'
const labelClass = 'text-[13px] font-semibold text-gray-700'

export function ContatoForm() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    const msg = buildContatoMessage(data.nome, data.telefone ?? '', data.mensagem)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(46,49,146,.08)] text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">Mensagem enviada!</h3>
        <p className="text-[14px] text-gray-500 mb-6">
          Você foi redirecionado ao WhatsApp. Aguarde nosso retorno em breve.
        </p>
        <button
          onClick={() => { setSent(false); reset() }}
          className="text-brand font-semibold text-[14px] border-[1.5px] border-brand rounded-lg px-5 py-2.5 font-sans hover:bg-brand hover:text-white transition-colors"
        >
          Enviar nova mensagem
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(46,49,146,.08)]">
      <h3 className="text-lg font-bold text-[#1A1A2E] mb-1.5">Envie uma mensagem</h3>
      <p className="text-[13px] text-gray-500 mb-6">
        Preencha o formulário e seja redirecionado ao WhatsApp com a mensagem pronta.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Nome *</label>
          <input
            {...register('nome')}
            placeholder="Seu nome completo"
            className={`${inputClass} ${errors.nome ? 'border-red-400' : ''}`}
          />
          {errors.nome && <p className="text-[11px] text-red-500 mt-1">{errors.nome.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Telefone</label>
          <input
            {...register('telefone')}
            placeholder="(45) 9 0000-0000"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Mensagem *</label>
          <textarea
            {...register('mensagem')}
            placeholder="Descreva o que você precisa..."
            rows={4}
            className={`${inputClass} resize-y min-h-[120px] ${errors.mensagem ? 'border-red-400' : ''}`}
          />
          {errors.mensagem && (
            <p className="text-[11px] text-red-500 mt-1">{errors.mensagem.message}</p>
          )}
        </div>

        <ClientWhatsAppButton
          onClick={handleSubmit(onSubmit)}
          className={`w-full ${!isValid ? 'opacity-60 cursor-not-allowed' : ''}`}
          size="md"
        >
          Enviar via WhatsApp
        </ClientWhatsAppButton>
      </form>
    </div>
  )
}
