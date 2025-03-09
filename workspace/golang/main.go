package main

import (
  "fmt"
  "time"
)

func main() {
  fmt.Println("Hello ASL!")

  dt := time.Now()

  fmt.Println(dt.Format("2006-01-02"))
}
