"use client"
import useSWR from "swr"

export default function Data() {
  const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXRhZGVsIiwiZXhwIjoxNzA0MTgwOTEzLCJqdGkiOiIyZTIyYTVmNC0wNzE2LTQzZWUtYTRjYy03MTcxMjZiODY3MjEiLCJjaGFubmVsIjoiNWE1OTAzZjU3Y2FmZDYwMDAxOTkyOTY2Iiwicm9sZSI6Im93bmVyIiwiYXV0aFRva2VuIjoidEtqZ3hibGdkbW5KT2t2UkRHUkYiLCJ1c2VyIjoiNWE1OTAzZjU3Y2FmZDYwMDAxOTkyOTY1IiwidXNlcl9pZCI6ImVjNDI4ZTY3LTZlYTEtNGEzNC04ODkyLTgwZGY5ZmJkNGM1MiIsInVzZXJfcm9sZSI6ImNyZWF0b3IiLCJwcm92aWRlciI6InR3aXRjaCIsInByb3ZpZGVyX2lkIjoiMzgwMDAzMDEiLCJjaGFubmVsX2lkIjoiZTU1ZDJmODgtYTg2Zi00YjNlLTkzZDktZmIzNDkzZjNkNDM4IiwiY3JlYXRvcl9pZCI6IjcyZTA4MmZkLWNhZDItNDhhYS1iMzhhLTRhMjVjYTA3YTM3OCJ9.50O3s0FpnbV9K4cPNO-5om1jG2MZlIRgkzFvMUNfsFM"

  const malikChannelId = "64687a622c8b5bc99339a85c"
  const arkyChannelId = "5c61b8a59939ea589c442844"

  const fetcher = async (channelId: string) => {
    try {
      const response = await fetch(
        `https://api.streamelements.com/kappa/v2/sessions/${channelId}`,
        {
          cache: "no-store",
          headers: {
            Accept: "application/json; charset=utf-8",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      if (!response.ok) {
        console.log("response not ok", response)
        return 0
      }
      const data = await response.json()
      const subCount = data.data["subscriber-session"].count ?? 0
      return subCount
    } catch (error) {
      console.error(error)
      return 0
    }
  }

  const { data: malik, error: malikError } = useSWR(malikChannelId, fetcher, {
    refreshInterval: 30000,
  })
  const { data: arky, error: arkyError } = useSWR(arkyChannelId, fetcher, {
    refreshInterval: 30000,
  })

  const total = 0 + (malik ?? 0) + (arky || 0)

  return <h1 className="text">{`24HR SUBS ${total}/500`}</h1>
}
