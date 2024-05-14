package telegram

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"sort"
	"strings"
)

type TelegramManager interface {
	CheckTelegramAuthorization(parameters map[string]string) bool
}

type Manager struct {
	token string
}

func NewManager(token string) *Manager {
	return &Manager{token: token}
}

func (manager *Manager) CheckTelegramAuthorization(parameters map[string]string) bool {
	keyHash := sha256.New()
	keyHash.Write([]byte(manager.token))
	secretKey := keyHash.Sum(nil)

	var checkParams []string
	for key, value := range parameters {
		if key != "hash" && len(value) != 0 {
			checkParams = append(checkParams, fmt.Sprintf("%s=%s", key, value))
		}
	}

	sort.Strings(checkParams)
	checkString := strings.Join(checkParams, "\n")

	hash := hmac.New(sha256.New, secretKey)
	hash.Write([]byte(checkString))
	hashStr := hex.EncodeToString(hash.Sum(nil))

	return hashStr == parameters["hash"]
}
