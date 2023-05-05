import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
export async function GET() {


  return NextResponse.json({ hello: 'world' });
}
 
export async function POST(
  request: Request
) {
  const body = await request.json();
  const data = body 
  return redirect('/login');

}