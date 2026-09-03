import requests

url = "https://resang.edragongame.com/api/init_resang_config" # 建议去掉 .js 后缀
response = requests.post(url, json={"name": "test_user"}) # 加上 json 参数传递数据

print("状态码:", response.status_code)
print("返回内容:", response.text)