package telegram

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"sort"
	"strings"
)

type Manager struct {
	Token string
}

func NewTelegramManager(token string) *Manager {
	return &Manager{
		Token: token,
	}
}

func (m *Manager) CheckTelegramAuthorization(params map[string]string) bool {
	keyHash := sha256.New()
	keyHash.Write([]byte(m.Token))
	secretKey := keyHash.Sum(nil)

	var checkParams []string
	for k, v := range params {
		if k != "hash" && len(v) != 0 {
			checkParams = append(checkParams, fmt.Sprintf("%s=%s", k, v))
		}
	}
	sort.Strings(checkParams)
	checkString := strings.Join(checkParams, "\n")
	hash := hmac.New(sha256.New, secretKey)
	hash.Write([]byte(checkString))
	hashStr := hex.EncodeToString(hash.Sum(nil))
	if hashStr == params["hash"] {
		return true
	}
	return false
}
