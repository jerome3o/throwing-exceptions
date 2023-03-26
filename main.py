batch_1 = {
  "Sue and Peter": "GG",
  "John and Judith": "JJ",
  "Harriet and Rowan": "MD",
  "Emily and Henry": "EH",
  "Matt and Aleks": "MA",
  "Rosie and Jackson": "RJ",

  "Niamh Swannack": "NS",
  "Emily Doyle": "ED",

  "Marco Tyler-Rodrigue": "M",
  "Kieran Hitchcock": "KH",
  "Rowena Devathasan": "RO",
}

batch_2 = {
    # other
    "Olivia Kyle": "OK",

    # OG analysis
    "Evan Simmers": "ES",
    "Will Snell": "WS",
    "Phil Dahm": "PD",
    "Alan Mcnaughton": "AM",

    # Op Data
    "Lara Collier": "LC",
    "Greissen Leslie": "GL",
    "Antonio Ojeda Macias": "AM",
    "Jules van der Toorn": "JT",

    # Covid 9Team
    "Karen Panoedjoe": "KP",
    "Chris Lu": "CL",
    "Harrison Handley": "HH",
    "Ari Ryan": "AR",
    "Katherine Chen": "KC",
    "Diego Pinto": "DP",

    # Software
    "Flynn Doherty": "FD",
    "Max Isbey": "MI",
    "Maxime Thomasin": "MT",
    "Sam Bristow": "SB",
    "Anu Dissanayake": "AD",
    "Elizabeth Cammell": "EC",

    # "Simon Kessels": "SK",
    # "Matt Hawkins": "MH",
    # "Fillipo Tunesi": "FT",
    # "Likhitha Satrasala": "LS",
    # "Chris Ching": "CC",
    # "Andrew Haigh": "AH",
}

people = {
    "Kyle Sefonte": "KS",
    "Eleanor Olsen": "EB",

    "Andrea Daly": "AD",
    "Aurora Ballantyne": "AB",
    "Chris Ballantyne": "CB",

    "Ben White": "BW",
    "Hannah Wilson": "HW",
    "Alex Le Comte": "AL",
    "Rachel Tassoni": "RT",
}


def get_bin_string(s: str):
    binary_string = ""

    # Loop through each character in the string
    for c in s:
        # Get the ASCII code for the character
        ascii_code = ord(c)
        # Convert the ASCII code to a binary string
        binary_string += bin(ascii_code)[2:].zfill(8)

    # Print only the 1s and 0s, without the 0b prefix
    return binary_string


def main():
    for name, initial in people.items():
        n = get_bin_string(initial)
        # add spaces every 4 characters
        n = " ".join(n[i:i + 4] for i in range(0, len(n), 4))

        print(f"{name:21}", n)

if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.INFO)
    main()
