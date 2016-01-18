"""
Provides a more structured call to the nodejs bing
"""

import os
import sys
import argparse
import subprocess


def main():
    parser = argparse.ArgumentParser(description="Use Bing's API services")
    parser.add_argument("query", nargs="*", help="Query string")
    parser.add_argument("-s", "--service", default="Web", choices=["Web", "Image", "News"])
    args = parser.parse_args()
    query = "%20".join(args.query)
    sys.stdout.write("%s %s\n" % (args.service, query))

if __name__ == '__main__':
    main()
