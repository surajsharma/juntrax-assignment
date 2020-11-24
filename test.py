#  [[1, 2, 3, 4, 5],
#  [1, 2, 3, 5],
#  [1, 3, 4, 5],
#  [1, 3, 5]]

data = {
    1: [2, 3, 4, 5],
    2: [6],
    3: [6, 7],
    4: [7, 8],
    5: [8],
}


def dfs(data, path, paths=[]):
    datum = path[-1]
    print(datum, path, paths)
    if datum in data:
        for val in data[datum]:
            new_path = path + [val]
            paths = dfs(data, new_path, paths)
    else:
        paths += [path]
    return paths


print(dfs(data=data, path=[1], paths=[]))
