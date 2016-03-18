#!/usr/bin/env bash
 cat p022_names.txt | tr "," "\n" | tr -d '"' | sort 
