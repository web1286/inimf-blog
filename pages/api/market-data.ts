import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 读取市场数据文件
    const dataPath = path.join(process.cwd(), 'public/data/market-data.json')
    const fileContent = fs.readFileSync(dataPath, 'utf-8')
    const rawData = JSON.parse(fileContent)

    // 字段名映射：change_percent -> changePercent, timestamp -> updatedAt
    const transformedData = {
      updatedAt: rawData.timestamp || rawData.updatedAt || new Date().toISOString(),
      indices: rawData.indices?.map((item: any) => ({
        name: item.name,
        value: item.value,
        change: item.change || '0',
        changePercent: item.change_percent || item.changePercent || '0%'
      })) || [],
      treasury_bonds: rawData.treasury_bonds?.map((item: any) => ({
        name: item.name,
        yield: item.yield || item.value,
        change: item.change_percent || item.change || '0%'
      })) || [],
      commodities: rawData.commodities?.map((item: any) => ({
        name: item.name,
        price: item.price || item.value,
        change: item.change || '0',
        changePercent: item.change_percent || item.changePercent || '0%'
      })) || [],
      crypto: rawData.crypto?.map((item: any) => ({
        name: item.name,
        price: item.price || item.value,
        change: item.change || '0',
        changePercent: item.change_percent || item.changePercent || '0%'
      })) || [],
      forex: rawData.forex?.map((item: any) => ({
        name: item.name,
        price: item.price || item.value,
        change: item.change || '0',
        changePercent: item.change_percent || item.changePercent || '0%'
      })) || [],
      bonds: rawData.bonds || rawData.treasury_bonds?.map((item: any) => ({
        name: item.name,
        yield: item.yield || item.value,
        change: item.change_percent || item.change || '0%'
      })) || []
    }

    // 返回数据
    res.status(200).json(transformedData)
  } catch (error) {
    console.error('读取市场数据失败:', error)
    res.status(500).json({ error: '无法读取市场数据' })
  }
}
