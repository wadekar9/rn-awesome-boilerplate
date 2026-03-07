import { useMemo } from "react"
import { Edge, useSafeAreaInsets } from "react-native-safe-area-context"

type ExtendedEdge = Edge | "start" | "end"

const propertySuffixMap = {
  top: "Top",
  bottom: "Bottom",
  left: "Start",
  right: "End",
  start: "Start",
  end: "End",
}

const edgeInsetMap: Record<string, Edge> = {
  start: "left",
  end: "right",
}

type SafeAreaInsetsStyle<
  Property extends "padding" | "margin" = "padding",
  Edges extends Array<ExtendedEdge> = Array<ExtendedEdge>,
> = {
    [K in Edges[number]as `${Property}${Capitalize<K>}`]: number
  }

export function useSafeAreaInsetsStyle<
  Property extends "padding" | "margin" = "padding",
  Edges extends Array<ExtendedEdge> = [],
>(
  safeAreaEdges: Edges = [] as unknown as Edges,
  property: Property = "padding" as Property,
): SafeAreaInsetsStyle<Property, Edges> {
  const insets = useSafeAreaInsets()

  return useMemo(
    () =>
      safeAreaEdges.reduce((acc, e) => {
        const value = edgeInsetMap[e] ?? e
        return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] }
      }, {}),
    [insets, safeAreaEdges, property],
  ) as SafeAreaInsetsStyle<Property, Edges>
}