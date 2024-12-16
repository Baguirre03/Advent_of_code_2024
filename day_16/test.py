from heapq import heappush, heappop
from collections import deque
filename = "input.txt"
board = []
sx,sy = -1,-1
ex,ey = -1,-1

for line in open(filename, "r"):
    board.append(line)


directions = [[0,1],[1,0],[0,-1],[-1,0]]
for i in range(len(board)):
    for j in range(len(board[i])):
        if board[i][j] == 'S':
            sx,sy = i,j
        if board[i][j] == 'E':
            ex,ey = i,j

cost = [[[float('inf') for k in range(4)] for j in range(len(board[i]))] for i in range(len(board))]

cost[sx][sy][0] = 0
hq = []
heappush(hq, (0, sx, sy, 0))
while hq:
    score, x, y, direction = heappop(hq)
    a,b = directions[direction]
    if score > cost[x][y][direction]: continue
    # Move in current direction
    nx,ny = x+a,y+b
    if board[nx][ny] != '#' and 1 + score < cost[nx][ny][direction]:
        cost[nx][ny][direction] = 1 + score
        heappush(hq, (cost[nx][ny][direction], nx, ny, direction))

    # Change direction
    for k in [-1,1]:
        new_dir = (direction + k) % 4
        if 1000 + score < cost[x][y][new_dir]:
            cost[x][y][new_dir] = 1000 + score
            heappush(hq, (cost[x][y][new_dir], x, y, new_dir))


lowest = min(cost[ex][ey][d] for d in range(4))
visited = set()
dq = deque()
for d in range(4):
    if cost[ex][ey][d] == lowest:
        dq.append((ex, ey, d))
        visited.add((ex,ey,d))

while dq:
    x,y,d = dq.popleft()
    for i,(a,b) in enumerate(directions):
        x2,y2 = x+a,y+b
        if board[x2][y2] == '#': continue
        new_direction = (i+2)%4
        if (x2,y2,new_direction) in visited: continue
        different_direction = d != new_direction
        if cost[x2][y2][new_direction] + 1000 * different_direction + 1 != cost[x][y][d]: continue
        dq.append((x2,y2,new_direction))
        visited.add((x2,y2,new_direction))

actual_visited = set()
for x,y,d in visited:
    actual_visited.add((x,y))

print(len(actual_visited))

