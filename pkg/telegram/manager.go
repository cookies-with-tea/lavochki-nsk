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

func (manager *Manager) CheckTelegramAuthorization(params map[string]string) bool {
	keyHash := sha256.New()
	keyHash.Write([]byte(manager.Token))
	secretKey := keyHash.Sum(nil)

	var checkParams []string
	for key, value := range params {
		if key != "hash" && len(value) != 0 {
			checkParams = append(checkParams, fmt.Sprintf("%s=%s", key, value))
		}
	}
	sort.Strings(checkParams)
	checkString := strings.Join(checkParams, "\n")
	hash := hmac.New(sha256.New, secretKey)
	hash.Write([]byte(checkString))
	hashStr := hex.EncodeToString(hash.Sum(nil))
	return hashStr == params["hash"]
}
