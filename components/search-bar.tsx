"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCallback } from "react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const handleClear = useCallback(() => {
    onChange("")
  }, [onChange])

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks and to-dos..."
        className="pl-10 pr-10"
        aria-label="Search tasks and to-dos"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

