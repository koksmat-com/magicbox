import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
 
export async function GET(request: NextRequest) {
  revalidatePath("/koksmat/admin/auditlog")
  return NextResponse.json({ revalidated: true, now: Date.now() })
}