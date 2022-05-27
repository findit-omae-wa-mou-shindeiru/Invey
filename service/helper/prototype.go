package helper

import (
	"fmt"
	"strings"
)

func Ternary[T any](condition bool, a, b T) T {
    if(condition) {
        return a
    } else {
        return b
    }
}

func ArrayToString[T any](a []T, delim string) string {
    return strings.Trim(strings.Replace(fmt.Sprint(a), " ", delim, -1), "[]")
}
