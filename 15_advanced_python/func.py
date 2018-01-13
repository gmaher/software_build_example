import inspect
f = lambda x: x[0]+x[1]

def print_func(f):
    print inspect.getsource(f)

print_func(f)
